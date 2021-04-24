import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef
} from 'react';
import { Form } from 'antd';
import TableRender from '@/components/Table';
import { connect } from 'dva';
import { fieldRender } from '@/utils/fieldRender';
import uuid from 'uuid/v4';

const List = ({
  childRef,
  columns,
  colsLen,
  valCodeSet,
  dispatch,
  viewCode
  // ...props
}) => {
  const [dataSource, setDataSource] = useState([]);
  const [colList, setColList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    // 解析columns
    const list = colsLen && columns.map((column) => 
      column.editEnable 
      ? {
        ...column,
        render: (val, record) => {
          if (record._status === 'create') {
            const props = {
              key: column.dataIndex,
              name: column.dataIndex,
              rules: [{required: column.required, message: `${column.dataIndex} is required!` }],
            }

            if (['SWITCH'].includes(column.fieldWidget)) {
              props.valuePropName = 'checked';
            }

            return (
              <Form.Item {...props}>
                {
                  ['SELECT'].includes(column.fieldWidget)
                    ? fieldRender({...column, sourceSet: valCodeSet[column.sourceCode]})
                    : fieldRender(column)
                }
              </Form.Item>
            )
          }

          return val;
        }
      } : column
    ) || [];

    setColList(list)
    // fetchList();
  }, [viewCode, colsLen])

  const fetchList = useCallback(() => {
    dispatch({
      type: 'dynamicConf/fetchTableFieldsList',
      payload: {viewCode}
    }).then((list) => {
      if (list && Array.isArray(list)) {
        setDataSource(list);
      }
    })
  }, [viewCode])

  // 新建列表行数据
  const handleCreateLine = useCallback(() => {
    const rowKey = 'lineId'
    const newLine = {
      _status: 'create',
      [rowKey]: uuid()
    }

    setDataSource([newLine, ...dataSource])
  }, [])

  // // 保存列表行数据（思考，跨行保存的解决方案）
  const handleSaveLines = useCallback(() => {
    form.validateFields().then(values => {
      dispatch({
        type: 'dynamicConf/saveTableDataList',
        payload: {values}
      }).then((res) => {
        console.log(res, 'res=')
      })
    });
  }, [])

  useImperativeHandle(childRef, () => ({
    handleCreateLine,
    handleSaveLines,
  }), [handleCreateLine, handleSaveLines])

  // const columnsList = [
  //   {
  //     dataIndex: 'width',
  //     title: '宽度',
  //     editEnable: true,
  //     fieldWidget: 'INPUT',
  //     fieldVisible: true,
  //     render: () => <div>111111</div>
  //   }
  // ]

  const tableProps = {
    rowKey: 'lineId',
    columns: colList,
    dataSource,
  }

  return (
    <div className="table-wrapper">
      <Form form={form} component={false}>
        <TableRender {...tableProps} scroll={{x: '120vw'}}/>
      </Form>
    </div>
  )
}

const Index = ({
  columns,
  viewCode,
  ...props
}) => {
  const colsLen = Array.isArray(columns) && columns.length || 0;
  return useMemo(
    () => <List {...{columns, colsLen, ...props}}/>,
    [colsLen, viewCode]
  )
};

export default connect(
  ({ dynamicConf }) => ({ dynamicConf })
)(
  forwardRef((props, childRef) => 
    (<Index {...{childRef, ...props}}/>
  ))
);