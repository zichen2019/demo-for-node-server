import { Select, Input, Switch, InputNumber } from 'antd';

export function fieldRender(field) {
  switch(field.fieldWidget) {
    case 'INPUT':
      return (<Input />);
    case 'INPUTNUMBER':
      return (<InputNumber />);
    case 'SELECT':
      return (
        <Select>
          {field.sourceSet && field.sourceSet.map(item => (
            <Select.Option key={item.value} value={item.value}>
              {item.meaning}
            </Select.Option>
          ))}
        </Select>
      );
    case 'SWITCH':
      return (
        <Switch />
      );
    default:
      return (<Input onChange={field.onChange} disabled={field.disabled} />);
  }
}