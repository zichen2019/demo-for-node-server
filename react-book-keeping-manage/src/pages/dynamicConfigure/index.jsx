import React, { Fragment } from 'react';
import { Button } from 'antd';
import { Header,Content } from '@/components/LayoutRender';

import List from './List';
import FormSearch from './FormSearch';

import './index.less';

const Index = () => {

  const queryFields = [[{
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

  const searchProps = {
    queryFields,
    viewCode: 'test01',
    templateCode: 'temp001'
  }
  return (
    <Fragment>
      <Header>
        <Button>保存</Button>
      </Header>
      <Content>
        <FormSearch {...searchProps} />
        <List />
      </Content>
    </Fragment>
  )
};

export default Index;