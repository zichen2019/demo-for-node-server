import React from 'react';
import TableRender from '@/components/Table';

const columns = [{
  dataIndex: 'lineNum',
  title: '序号',
  width: 80,
}, {
  dataIndex: 'goodsNum',
  title: '商品编号'
}, {
  dataIndex: 'goodsName',
  title: '商品名'
}, {
  dataIndex: 'goodsCategory',
  title: '商品类别'
}, {
  dataIndex: 'supplierId',
  title: '供应商',
  render: (val, record) => record.supplierName
}, {
  dataIndex: 'createDate',
  title: '创建时间'
}]

const dataSource = [{
  goodsId: 'dfdfdsfs',
  lineNum: '1',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfdfdsdcsds',
  lineNum: '2',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfdsvsdgffdsfs',
  lineNum: '3',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfdsgsfgdgfdsfs',
  lineNum: '4',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfddsddsfdsfdsfs',
  lineNum: '5',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfdsvsdgfffsdfdsdsfs',
  lineNum: '6',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dffsdfdsdsgsfgdgfdsfs',
  lineNum: '7',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfddsdsfdsfddsfdsfdsfs',
  lineNum: '8',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfdsvsdfdsfdsfdssdgffdsfs',
  lineNum: '9',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfdssdvcvdvgsfgdgfdsfs',
  lineNum: '10',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
},{
  goodsId: 'dfddcdsvdvsdsddsfdsfdsfs',
  lineNum: '11',
  goodsName: '西瓜',
  goodsNum: 'watermelon',
  goodsCategory: '水果',
  supplierId: 'Numx12334',
  supplierName: '供应商A',
  createDate: '2021-03-14',
}]

const List = (props) => {
  return (
    <TableRender
      rowKey="goodsId"
      columns={columns}
      dataSource={dataSource}
    />
  )
}

export default List;