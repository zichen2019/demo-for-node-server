import React, { useEffect, useCallback, Fragment } from 'react';
import { Button } from 'antd';
import { Header,Content } from '@/components/LayoutRender';
import { connect } from 'dva'; 
import { useSetState } from '@/utils/hooks';

import List from './List';
import FormSearch from './FormSearch';

import './index.less';

const Index = ({
  dispatch
}) => {
  const [state, setState] = useSetState({
    viewCode: 'test001',
    formFields: [],   // 列表筛选字段
    dataFields: [],   // 列表字段
  });
  
  const { viewCode, formFields } = state;
  
  useEffect(() => {
    dispatch({
      type: 'dynamicConf/fetchList',
      payload: {viewCode}
    }).then((list) => {
      console.log('fetch list: ', list)
      setState({
        formFields: list,
      })
    })
  }, [viewCode])

  const searchProps = {
    formFields,
    viewCode: 'test01',
    templateCode: 'temp001'
  }

  const test = () => {
    console.log('测试');
  }
  console.log('func test=', test);
  
  const onCreate = useCallback(() => {

  }, []);

  return (
    <Fragment>
      <Header>
        <Button onClick={test}>保存</Button>
      </Header>
      <Content>
        <FormSearch {...searchProps} />
        <List />
      </Content>
    </Fragment>
  )
};


// export default compose(
//   connect(({ dynamicConf }) => ({
//     dynamicConf
//   })),
// )(Index);

export default connect(({dynamicConf}) => ({dynamicConf}))(Index)