module.exports = [
  {
    pathname: '/dynamic/fetch-configures',
    method: 'get',
    eventHandler: [
      (req, res) => {
        const data = [{
          dataIndex: 'status',
          title: '状态',
          fieldWidget: 'SELECT',
          queryFlag: true,
          gridSeq: 10,
          sourceCode: 'STATUS.CODE.VALUES'
        }, {
          dataIndex: 'fieldWidget',
          title: '组件类型',
          fieldWidget: 'SELECT',
          queryFlag: true,
          gridSeq: 20,
          sourceCode: 'WIDGET.CODE.VALUES'
        }, {
          dataIndex: 'status',
          title: '状态',
          width: 80,
          fieldWidget: 'INPUT',
          editEnable: false,
          gridSeq: 10,
          fieldVisible: true,
          sourceCode: 'STATUS.CODE.VALUES'
        }, {
          dataIndex: 'isRequired',
          title: '是否必须',
          width: 180,
          fieldWidget: 'SWITCH',
          editEnable: true,
          fieldVisible: true,
        }, {
          dataIndex: 'editEnable',
          title: '是否可编辑',
          width: 180,
          editEnable: true,
          fieldWidget: 'SWITCH',
          fieldVisible: true,
        }, {
          dataIndex: 'fieldVisible',
          title: '是否显示',
          width: 180,
          editEnable: true,
          fieldWidget: 'SWITCH',
          fieldVisible: true,
        }, {
          dataIndex: 'queryFlag',
          title: '是否作为查询条件',
          editEnable: true,
          width: 260,
          fieldWidget: 'SWITCH',
          fieldVisible: true,
        }, {
          dataIndex: 'gridSeq',
          title: '位置',
          width: 180,
          editEnable: true,
          fieldWidget: 'INPUTNUMBER',
          fieldVisible: true,
        }, {
          dataIndex: 'width',
          title: '宽度',
          width: 180,
          editEnable: true,
          fieldWidget: 'INPUTNUMBER',
          fieldVisible: true,
        }, {
          dataIndex: 'fieldWidget',
          title: '组件类型',
          width: 260,
          editEnable: true,
          fieldWidget: 'SELECT',
          gridSeq: 20,
          fieldVisible: true,
          sourceCode: 'WIDGET.CODE.VALUES'
        }]

        res.end(JSON.stringify(data));
      }
    ]
  }, {
    pathname: '/dynamic/fetch-value-set',
    method: 'get',
    eventHandler: [
      (req, res) => {
        const data = {
          "STATUS.CODE.VALUES": [
            {value: 'created', meaning: '新建'},
            {value: 'submited', meaning: '已提交'},
            {value: 'deleted', meaning: '已删除'},
          ],
          "WIDGET.CODE.VALUES": [
            {value: 'input', meaning: '文本框'},
            {value: 'datePicker', meaning: '日期'},
            {value: 'select', meaning: '下拉框'},
          ],
        }

        res.end(JSON.stringify(data));
      }
    ]
  }, {
    pathname: '/dynamic/fetch-data-list',
    method: 'get',
    eventHandler: [
      (req, res) => {
        const data = [];

        res.end(JSON.stringify(data));
      }
    ]
  }, {
    pathname: '/dynamic/update-data-list',
    method: 'post',
    eventHandler: [
      (req, res) => {
        console.log(req.body, 'req')
        res.send(JSON.stringify({msg: 'success'}));
      }
    ]
  }
]