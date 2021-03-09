const express = require('express');
const router = express.Router();

const static = require('./routes/static');
const upload = require('./routes/upload');
const bookKeeping = require('./routes/bookKeeping');

const routes = [];
Array.prototype.push.call(
  routes,
  ...Array.isArray(static)
    ? static
    : [static],
  ...Array.isArray(upload)
    ? upload
    : [upload],
  ...Array.isArray(bookKeeping)
    ? bookKeeping
    : [bookKeeping],
);

routes.forEach(({
  pathname,
  method,
  eventHandler
}) => {
  router[method](pathname, ...eventHandler)
})

module.exports = router;