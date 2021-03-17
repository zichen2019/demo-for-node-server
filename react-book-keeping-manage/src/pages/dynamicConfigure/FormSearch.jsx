import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useSetState } from '@/utils/hooks';
import { Select, Form, Row, Col, Input, Button } from 'antd';
import { isEmpty } from 'lodash';
import { fieldRender } from '@/utils/fieldRender';

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const FormSearch = ({
  queryFields,
  fieldsLen,
  viewCode,
  valCodeSet,
}) => {
  const [state, setState] = useSetState({
    expandForm: false,
  })
  const [fGroupList, setFieldsGroupList] = useState([]);
  const [form] = Form.useForm();

  const { expandForm } = state;
  // 解析筛选表单
  useEffect(() => {
    console.log('queryFields=', queryFields)
    const list = fieldsLen && queryFields.map((l) => (
      l.map((item, index) => 
        ['SELECT'].includes(item.fieldWidget)
          ? renderField({
            ...item,
            sourceSet: valCodeSet[item.sourceCode]
          }, `${item.dataIndex}_${index}`)
          : renderField(item, `${item.dataIndex}_${index}`)
      )
    )) || [];

    setFieldsGroupList(list)
  }, [viewCode, fieldsLen])

  // 渲染表单逻辑
  const renderField = (field, key) => {
    let component = fieldRender(field, key);

    return (
      <Col span={8} key={key}>
        <Form.Item
          {...formItemLayout}
          label={field.title}
          name={field.dataIndex}
          rules={[{required: field.required, message: `${field.dataIndex} is required!` }]}
        >
          {component}
        </Form.Item>
      </Col>
    )
  }

  const handleToggleForm = useCallback((status) => {
    setState({
      ...state,
      expandForm: status
    })
  }, []);

  const handleReset = useCallback(() => {
    form.resetFields();
  }, []);

  const handleSearch = useCallback(() => {
    form.validateFields().then(values => {
      console.log('values=', values)
    });
  }, [])


  return (
    <Form form={form} name="advanced_search" className="advanced-search">
      <Row gutter={12}>
        <Col span={18}>
          {fGroupList.map((list, index) => (
            <Row
              style={index === 1 ? {display: expandForm ? 'flex' : 'none'} : null}
              gutter={12}
              key={index}
            >
              {list}
            </Row>
          ))}
        </Col>
        <Col span={6} className="search-btn-more">
          <Button disabled={isEmpty(fGroupList[1])} onClick={() => handleToggleForm(!expandForm)}>
            {expandForm ? '收起查询' : '更多查询'}
          </Button>
          <Button data-code="reset" onClick={handleReset}>
            重置
          </Button>
          <Button data-code="search" type="primary" htmlType="submit" onClick={handleSearch}>
            查询
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

const Index = ({
  queryFields,
  viewCode,
  ...props
}) => {
  const fieldsLen = Array.isArray(queryFields) && queryFields.flat(2).length || 0;
  return useMemo(
    () => <FormSearch {...{queryFields, fieldsLen, ...props}}/>,
    [fieldsLen, viewCode]
  )
};

export default Index;