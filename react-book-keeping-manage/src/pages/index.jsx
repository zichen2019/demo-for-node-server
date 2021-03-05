import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import { Link } from 'umi';
import './index.less'

const { Header, Content, Footer, Sider } = Layout;

const Logo = ({logo}) => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="logo"/>
        BookKeeping Manage
      </Link>
    </div>
  )
}

import RenderMenu from '../components/Menu'


const Index = (props) => {
  const [state, setState] = useState({});


  const {
    logo,
    formatMessage={formatMessage},
    // {...props}
    // {...settings}
    // onCollapse = () => {},
    onMenuHeaderClick = () => (history.pushState('/')),
    breadcrumbRender,
    itemRender,
    footerRender,
    menuDataRender,
    rightContentRender,
    postMenuData,
    staticContext,
    ...restProps
  } = props;
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Logo onclick={onMenuHeaderClick} logo={logo} />
        <RenderMenu  {...restProps}/>
      </Sider>
      <Layout>
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  )
}

export default Index;