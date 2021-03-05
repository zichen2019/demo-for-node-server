import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { Button, Result, Link } from 'antd'

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
    }
  } = props;

  const menuDataRef = useRef([]);
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent'
      })
    }
  }, []);

  /**
   * handle collapse
   */
  const handleMenuCollpase = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload
      });
    }
  }

  /**
   * get children authority
   */
  const authorized = useMemo(
    () => 
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined
      },
      [location.pathname],
  );

  const { formatMessage } = useIntl();

  return (
    <Fragment>

    </Fragment>
  )
}