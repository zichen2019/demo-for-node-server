import React, { useEffect, useCallback } from 'react';
import { useState } from '@/utils/hooks';
import { Form, Row, Col, Input, Button } from 'antd';
import { isValidArray } from '@/utils';
import { compose, isEmpty } from 'lodash'

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const FormSearch = ({
  queryFields,
  viewCode,
  templateCode,
}) => {
  const [state, setState] = useState({
    expandForm: false,
  })
  const [fGroupList, setFieldsGroupList] = useState([]);
  const [form] = Form.useForm();

  const { expandForm } = state;
  // 解析筛选表单
  useEffect(() => {
    if (isValidArray(queryFields)) {
      const list = queryFields.map((l) => (
        l.map((item, index) => renderField(item, `${item.dataIndex}_${index}`))
      ));

      setFieldsGroupList(list)
    }
  }, [viewCode, templateCode])

  // 渲染表单逻辑
  const renderField = (field, key) => {
    let component = null;

    switch(field.fieldWidget) {
      case 'INPUT':
        component = (<Input onChange={field.onChange} disabled={field.disabled} />);
        break;
      default:
        break;
    }

    return (
      <Col span={8} key={key}>
        <Form.Item
          {...formItemLayout}
          label={field.label}
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
          {/* <FormItem> */}
            <Button disabled={isEmpty(queryFields[1])} onClick={() => handleToggleForm(!expandForm)}>
              {expandForm ? '收起查询' : '更多查询'}
            </Button>
            <Button data-code="reset" onClick={handleReset}>
              重置
            </Button>
            <Button data-code="search" type="primary" htmlType="submit" onClick={handleSearch}>
              查询
            </Button>
            {/* </FormItem> */}
        </Col>
      </Row>
    </Form>
  )
}

export default FormSearch;

// export default compose(
//   // Form.create({fieldNameProp: null})
// )(FormSearch);