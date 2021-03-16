module.exports = [
  {
    pathname: '/dynamic/fetch-configures',
    method: 'get',
    eventHandler: [
      (req, res) => {
        const data = [[{
          label: '商品名',
          fieldWidget: 'INPUT',
          dataIndex: 'goodsName'
        }, {
          label: '商品名',
          fieldWidget: 'INPUT',
          dataIndex: 'goodsName'
        }, {
          label: '商品名',
          fieldWidget: 'INPUT',
          dataIndex: 'goodsName'
        }], [{
          label: '商品名',
          fieldWidget: 'INPUT',
          dataIndex: 'goodsName'
        }, {
          label: '商品名',
          fieldWidget: 'INPUT',
          dataIndex: 'goodsName'
        }, {
          label: '商品名',
          fieldWidget: 'INPUT',
          dataIndex: 'goodsName'
        }]]
        res.end(JSON.stringify(data));
      }
    ]
  }
]