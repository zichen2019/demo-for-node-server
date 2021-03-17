import React, { useEffect, useCallback, Fragment, useRef } from 'react';
import { Button } from 'antd';
import { Header,Content } from '@/components/LayoutRender';
import { connect } from 'dva'; 
import { useSetState } from '@/utils/hooks';

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
  
  useEffect(() => {
    dispatch({
      type: 'dynamicConf/fetchConfigureList',
      payload: {viewCode}
    }).then((list) => {
      if (list && Array.isArray(list)) {
        // console.log(list)
        const columns = [];
        const queryFields = [];

        list.forEach((item) => {
          // 是否为筛选节点
          if (item.queryFlag) {
            queryFields.push({
              name: item.dataIndex,
              label: item.title,
              ...item,
            });
          } else if (Number(item.fieldVisible)) {
            const key =
              item.fieldWidget === 'LOV' || item.fieldWidget === 'SELECT'
                ? `${item.dataIndex}Meaning`
                : item.dataIndex;
            columns.push({
              dataIndex: key,
              key,
              ...item,
            });
          }
        });
        initialFields(columns, queryFields);
      }
    })
    
  }, [viewCode])

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

    console.log('updateState=', updateState)

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
        <Button type="primary" onClick={onCreate}>新建</Button>
        <Button onClick={onSave}>保存</Button>
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