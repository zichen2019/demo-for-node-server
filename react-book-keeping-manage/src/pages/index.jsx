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
        Book Keeping
      </Link>
    </div>
  )
}

import RenderMenu from '../components/Menu'

import logo from '../assets/logo/logo.png'

const Index = (props) => {
  console.log('props=', props)
  const [state, setState] = useState({});


  const {
    // logo={logo},
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