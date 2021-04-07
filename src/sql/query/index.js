const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'zichen2019',
  database: 'vueShop'
})

let query = function (sql, values) {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject('链接异常：'.concat(err));
      } else {
        connection.query(sql, values, function(error, result, fields) {
          if (error) {
            reject(error);
            return;
          }
          resolve([result, fields]);
          connection.release();
        })
      }
    })
  })
}

module.exports = {
  query
}