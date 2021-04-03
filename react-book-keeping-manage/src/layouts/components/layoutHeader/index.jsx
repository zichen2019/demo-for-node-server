import { Dropdown, Menu, Tooltip } from 'antd';
import {
  UserOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

import './index.less'

const langMenu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://localhost:8000/dynamicField/dynamicConfigure">
        简体中文
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://localhost:8000/dynamicField/dynamicConfigure">
        繁体中文
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://localhost:8000/dynamicField/dynamicConfigure">
        英文
      </a>
    </Menu.Item>
  </Menu>
);

const userMenu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://localhost:8000/dynamicField/dynamicConfigure">
        个人中心
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://localhost:8000/dynamicField/dynamicConfigure">
        个人设置
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://localhost:8000/dynamicField/dynamicConfigure">
        退出登录
      </a>
    </Menu.Item>
  </Menu>
);

const layoutHeaderContent = () => {
  return (
    <div className="basic-header-wrap">
      <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className="action"
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <Dropdown overlay={userMenu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <UserOutlined /> 张三
        </a>
      </Dropdown>
      <Dropdown overlay={langMenu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          语言
        </a>
      </Dropdown>
    </div>
  )
}

export default layoutHeaderContent;