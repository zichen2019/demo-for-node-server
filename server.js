const express = require('express');
const router = require('./src/router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = new express();
const port = 8081;

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');//自定义中间件，设置跨域需要的响应头。
  res.header('Content-Type', 'text/plain;charset=utf-8');//自定义中间件，设置跨域需要的响应头。
  next();
 };

app.use(allowCrossDomain)
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(router);

const server = app.listen(port, 'localhost', () => {
  const { address, port } = server.address();
  app.set('host_address', `${address}:${port}`)
  console.log('the server now is listening at http://%s:%s', address, port);
})
