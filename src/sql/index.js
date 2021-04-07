const mysql = require('mysql');

const collection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'zichen2019',
  database: 'vueShop'
})