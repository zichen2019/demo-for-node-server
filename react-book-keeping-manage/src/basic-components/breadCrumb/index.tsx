import React, { FC, useCallback } from 'react';
import classnames from 'classnames';
import { createNamespace } from '../utils';

const [ prefixCls, bem ] = createNamespace('breadCrumb');

interface BreadCurmbProps {
  /**
   * 面包屑路径
   */
  paths?: [],
  /**
   * 分割符号
   * @default DEFAULT_ICON
   */
  specrator?: React.ReactNode,
  /**
   * 自定义类
   */
  extraCls?: 'string',
  /**
   * 自定义样式
   */
  extraStyle?: React.CSSProperties,
  /**
   * 自定义事件
   */
  onClick?: React.MouseEventHandler,
}

const BreadCrumb: FC<BreadCurmbProps> = (props) => {
  const {
    paths,
    specrator,
    extraStyle,
    extraCls,
    ...otherProps
  } = props;

  const renderItem = useCallback((path) => {
    // 如果存在自定义渲染函数，则调用；否则调用默认函数
    if (path.renderItem) {
      path.renderItem(path);
      return;
    }


  }, [])

  return (
    <div></div>
  )
}

export default BreadCrumb;