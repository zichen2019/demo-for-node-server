const path = require('path');
const util = require('util');
const _url = require('url');
const querystring = require('querystring');
const { queryDataFromSql } = require('../../../mysql');

const formatData = (data) => {
  return Object.keys(data).reduce((formatData, key) => {
    const formatKey = key.replace(/_\w+/, (...args) => args[1] && args[1].toUpperCase());
    formatData[`${formatKey}`] = data[key];
    return formatData;
  }, {})
}

module.exports = [
  {
    pathname: '/book-keeping/get-list',
    method: 'get',
    eventHandler: [
      (req, res) => {
        const { query } = _url.parse(req.url);
        const { userId, date } = querystring.parse(query);
        console.log('date=', date)
        console.log('userId=', userId)
        const sql = 'select * from book_keeping_list';
        queryDataFromSql(sql).then((result) => {
          if (result) {
            let data = JSON.parse(JSON.stringify(result));
            data = data.reduce((list, item) => {
              const formatD = formatData(item);
              const idx = list.findIndex(l => l.keepingDate === formatD.keeping_date);
              if (idx > -1) {
                list[idx].list.push(item);
              } else {
                list.push({
                  date: item.keeping_date,
                  list: [item]
                })
              }
              return list;
            }, [])
            // console.log('data=', data)
            res.end(JSON.stringify(data))
          } else {
            res.end(`{}`)
          }
        }, (err) => {
          console.log('err=', err);
        })
      }
    ]
  }
]