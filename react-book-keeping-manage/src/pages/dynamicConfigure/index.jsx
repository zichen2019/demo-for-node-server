import React, { useEffect, useCallback, Fragment, useRef } from 'react';
// import { Button } from 'antd';
import { Header, Content } from '@/layouts/components/LayoutRender';
import { connect } from 'dva'; 
import { useSetState } from '@/utils/hooks';
import Button from '../../basic-components/button';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';

import List from './List';
import FormSearch from './FormSearch';

import './index.less';

const Index = ({
  dispatch,
  // ...props
}) => {
  const [state, setState] = useSetState({
    viewCode: 'test001',
    initialable: true,
    queryFields: [],   // 列表筛选字段
    columns: [],   // 列表字段
    valCodeSet: [] // （下拉框）值集列表
  });
  const childRef = useRef({});
  
  const {
    viewCode,
    initialable,
    queryFields,
    columns,
    valCodeSet
  } = state;
  
  // useEffect(() => {
  //   dispatch({
  //     type: 'dynamicConf/fetchConfigureList',
  //     payload: {viewCode}
  //   }).then((list) => {
  //     if (list && Array.isArray(list)) {
  //       const columns = [];
  //       const queryFields = [];

  //       list.forEach((item) => {
  //         // 是否为筛选节点
  //         if (item.queryFlag) {
  //           queryFields.push({
  //             name: item.dataIndex,
  //             label: item.title,
  //             ...item,
  //           });
  //         } else if (Number(item.fieldVisible)) {
  //           const key =
  //             item.fieldWidget === 'LOV' || item.fieldWidget === 'SELECT'
  //               ? `${item.dataIndex}Meaning`
  //               : item.dataIndex;
  //           columns.push({
  //             dataIndex: key,
  //             key,
  //             ...item,
  //           });
  //         }
  //       });
  //       initialFields(columns, queryFields);
  //     }
  //   })
    
  // }, [viewCode])

  const initialFields = useCallback((columns, queryFields) => {
    const valCodeSet = {};

    const fields = queryFields
      .sort((a, b) => a.gridSeq - b.gridSeq)
      .reduce(
        (list, item, index) => {
          if (item.fieldWidget === 'SELECT') {
            valCodeSet[item.sourceCode] = item.sourceCode;
          }
          list[index < 3 ? 0 : 1].push(item);
          return list;
        },
        [[], []]
      );

    const updateState = {
      columns,
      queryFields: fields,
      initialable: true,
    };

    dispatch({
      type: 'dynamicConf/fetchValSet',
      payload: valCodeSet,
    }).then((Sets) => {
      try {
        if (Sets) {
          updateState.valCodeSet = Sets;
        }
        setState(updateState);
      } catch (err) {
        console.log('err=', err)
      } finally {
        setState(updateState);
      }
    });
  }, [])
  // setState({
  //   queryFields: list,
  // })
  
  // 新建行方法
  const onCreate = useCallback(() => {
    console.log('1111');
    return;
    childRef.current.handleCreateLine && childRef.current.handleCreateLine(); 
  }, []);

  // 保存
  const onSave = useCallback(() => {
    childRef.current.handleSaveLines && childRef.current.handleSaveLines(); 
  }, []);

  const searchProps = {
    queryFields,
    valCodeSet,
    viewCode: 'test01',
  }

  const listProps = {
    valCodeSet,
    columns,
  }

  return (
    <Fragment>
      <Header>
        <Button
          type="primary"
          size={'lg'}
          danger
          loading
          shape="round"
          icon={<StarOutlined />}
          onClick={onCreate}>新建</Button>
        <Button
          danger
          size={'sm'}
          type="dashed"
          icon={<StarOutlined />}
        >
          虚线
        </Button>
        <Button
          danger
          disabled
          size={'sm'}
          icon={<StarOutlined />}
        >
          实线
        </Button>
        <Button
          danger
          type="text"
          icon={<StarOutlined />}
        >
          文本
        </Button>
        <Button
          danger
          disabled
          type="link"
          href={'http://www.baidu.com'}
          target={'_blank'}
          icon={<StarOutlined />}
        >
          Link
        </Button>
        <Button
          type={'primary'}
          size={'sm'}
          shape={'circle'}
          icon={<StarOutlined />}
        >
        </Button>
        <Button
          type={'primary'}
          shape={'circle'}
          icon={<StarOutlined />}
        >
        </Button>
        <Button
          type={'primary'}
          size={'lg'}
          shape={'circle'}
          icon={<StarOutlined />}
        >
        </Button>
      </Header>
      <Content>
        {initialable && (
          <Fragment>
            <FormSearch {...searchProps} />
            <List childRef={childRef} {...listProps} />
          </Fragment>
        )}
      </Content>
    </Fragment>
  )
};

export default connect(({dynamicConf}) => ({dynamicConf}))(Index)