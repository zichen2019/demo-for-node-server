const express = require('express');
const router = require('./src/router');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = new express();
const port = 8081;

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(router);

const server = app.listen(port, 'localhost', () => {
  const { address, port } = server.address();
  app.set('host_address', `${address}:${port}`)
  console.log('the server now is listening at http://%s:%s', address, port);
})
