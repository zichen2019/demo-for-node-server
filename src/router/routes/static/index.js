const path = require('path');
const util = require('util');

module.exports = [
  {
    pathname: '/',
    method: 'get',
    eventHandler: [
      (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../../../', 'static/index.html'))
      }
    ]
  }
]