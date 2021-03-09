const mysql = require('mysql');

exports.queryDataFromSql = function(sql) {
  return new Promise((resolve, reject) => {
    const collection = mysql.createConnection({
      host: 'localhost',
      user: 'root', 
      password: 'zichen2019',
      database: 'bookkeeping'
    })
    collection.connect();
    collection.query(sql, (err, result) => {
      if (err) {
        console.log('err=', err.message)
        reject(err.message);
        return;
      }
      resolve(result);
      collection.end();
    })
  })
}