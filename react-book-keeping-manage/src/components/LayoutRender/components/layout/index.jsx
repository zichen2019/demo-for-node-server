import React from 'react';
import { layout } from 'antd';
import { classnames } from '@/utils'
import './index.less';

const { Header, Content } = layout;


// header
const HeaderWrap = ({
  className,
  headerRender,
  children,
  ...rest
}) => {
  return (
    <Header className={classnames('basic-header', className)}>
      {headerRender
        ? headerRender({...rest, children})
        : (children)
      }
    </Header>
  )
}

// content
const ContentWrap = ({
  children
}) => (
  <Content className="customize-content">
    {children}
  </Content>
)

export{
  HeaderWrap as Header,
  ContentWrap as Content,
}
  