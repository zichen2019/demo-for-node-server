import React, {useRef, useMemo, useState, useEffect, useCallback, Fragment } from 'react';
import { Button, Result } from 'antd';
import { Link } from 'umi';
import LayoutRender from './components/LayoutRender';
import layoutHeaderContent from './components/layoutHeader';
import logo from '@/assets/logo/logo.png'

const notMatch = (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={[
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    ]}
  />
)

const menuDataRender = (menus) => {
  menus.map((menu) => {
    const localMenu = {
      ...menu,
      children: menu.children ? menuDataRender(menu.children) : undefined
    }
    return Authorized.check(menu.authority, localMenu, null)
  })
}

const defaultFooterDom = (
  <div>footer</div>
)


const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/'
    },
    routes,
    theme='dark'
  } = props;

  return (
    <>
      <LayoutRender
        logo={logo}
        theme={theme}
        onMenuHeaderClick={() => history.pushState('/')}
        routes={routes}
        headerRender={layoutHeaderContent}
      >
        {children}
      </LayoutRender>
    </>
  )
}

export default BasicLayout;