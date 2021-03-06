import React, { useState } from 'react';
import { Layout } from 'antd';
import { Link } from 'umi';

import BasicMenuRender from './components/Menu';
import { Header, Content as PageContent } from './components/layout'; 

import './index.less';

const { Content, Footer, Sider } = Layout;

const Logo = ({logo}) => {
  return (
    <div className="logo">
      <Link to="/">
        {/* <img src={logo} alt="logo"/> */}
        Book Keeping
      </Link>
    </div>
  )
}





const Index = ({
  logo={logo},
  onMenuHeaderClick = null,
  formatMessage={formatMessage},
  breadcrumbRender,
  itemRender,
  footerRender,
  menuDataRender,
  headerRender,                              // 页头渲染逻辑
  postMenuData,
  staticContext,
  children,
  theme='dark',
  ...restProps
}) => {
  return (
    <Layout
      className="basic-layout-render"
    >
      <Sider theme={theme}>
        <Logo onclick={onMenuHeaderClick} logo={logo} />
        <BasicMenuRender theme={theme} {...restProps}/>
      </Sider>
      <Layout>
        <Header headerRender={headerRender} className="layout-sub-header" />
        <Content>{children}</Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  )
}

export default Index;

export {
  Header,
  PageContent as Content
}