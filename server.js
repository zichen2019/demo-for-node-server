const express = require('express');
const router = require('./src/router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = new express();
const port = 8081;
const { createTable, insertData, updateData, deleteSingleRecord, deleteRecordBatch } = require('./src/sql/sql-utils')

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000'),
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'),
  res.header('Access-Control-Allow-Headers', 'Pragma, Cache-Control'),
  res.header('Access-Control-Expose-Headers', 'Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE'),
  res.header('Content-Type', 'text/plain;charset=utf-8')
  next();
}
app.use(allowCrossDomain)
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(router);

const server = app.listen(port, 'localhost', () => {
  const { address, port } = server.address();
  app.set('host_address', `${address}:${port}`)
  console.log('the server now is listening at http://%s:%s', address, port);
})


// const mySql = require('mysql');

// const connection = mySql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'zichen2019',
//   database: 'vueShop'
// })

// connection.connect();

// createTable(connection, {
//   tbName: 'test',
//   primaryId: 'id',
//   age: 'DECIMAL(5)',
//   address: 'VARCHAR(40)',
//   id: 'INT UNSIGNED AUTO_INCREMENT',
//   name: 'VARCHAR(40) NOT NULL',
//   phone: 'VARCHAR(20)',
//   sex: 'CHAR(10)',
// }).then(res=> {
//   console.log('结果为：', res);
// })

// insertData({tbName: 'test'}, [{
//   age: 18,
//   address: '上海青浦',
//   name: '张三',
//   phone: '12345',
//   sex: '男',
// }, {
//   age: 19,
//   address: '上海青浦',
//   name: '李四',
//   phone: '13456',
//   sex: '男',
// }, {
//   age: 20,
//   address: '上海青浦',
//   name: '王五',
//   phone: '13788828398',
//   sex: '男',
// }, {
//   age: 21,
//   address: '上海青浦',
//   name: '赵六',
//   phone: '13788828398111',
//   sex: '男',
// }])
// .then(res=> {
//   console.log('插入成功', res);
// })


// deleteSingleRecord('test', 'id', '71');

deleteRecordBatch('test', 'id', ['94', '95', '96', '97', '90', '91', '92', '93'])

// updateData(
//   {tbName: 'test'},
//   ['age', 'address', 'name', 'phone', 'sex'],
//   [{
//     id: 1,
//     age: 18,
//     address: '中国.北京',
//     name: '李四',
//     phone: '12345',
//     sex: '男',
//   }, {
//     id: 2,
//     age: 19,
//     address: '中国.上海',
//     name: '隔壁老王',
//     phone: '13456',
//     sex: '男',
//   }, {
//     id: 3,
//     age: 20,
//     address: '上海.青浦',
//     name: '王五',
//     phone: '13788828398',
//     sex: '男',
//   }, {
//     id: 4,
//     age: 21,
//     address: '上海青浦',
//     name: '赵六',
//     phone: '13788828398111',
//     sex: '男',
//     }
//   ]
// )