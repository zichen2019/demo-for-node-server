import React, { FC, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { createNamespace } from '../utils';
import {
  LoadingOutlined,
} from '@ant-design/icons';
import './index.less';

const [ prefixCls, bem ] = createNamespace('button');
console.log('prefixCls=', prefixCls)
console.log('container=', bem('container'))
console.log('prefixCls=', prefixCls)

interface ButtonProps {
  /**
   * 按钮类型
   * @default default
   */
  type?: 'default' | 'primary' | 'dashed' | 'link' | 'text',
  /**
   * 按钮大小
   * @default mid
   */
  size?: 'sm' | 'mid' | 'lg'
  /**
   * 自定义按钮icon
   */
  icon?: React.ReactNode,
  /**
   * 按钮形状
   */
  shape?: 'circle' | 'round',
  /**
   * 自定义类
   */
  extraCls?: string,
  /**
   * 自定义样式
   */
  extraStyle?: React.CSSProperties,
  /**
   * 自定义按钮事件
   */
  onClick?: React.MouseEventHandler,
  /**
   * 是否禁止按钮点击
   */
  disabled?: boolean,
  /**
   * 设置危险按钮
   */
  danger?: boolean,
  /**
   * 自定义子节点
   */ 
  children?: React.ReactNode,
  /**
   * type为link时，跳转的链接地址
   */
  href?: string,
  /**
   * type为link时，相当于href的target
   * @default '_blank''
   */
  target?: string,
  /**
   * 设置loading状态
   */
  loading?: boolean,
}

const Button:FC<ButtonProps> = (props) => {
  const {
    type: btnType = 'default',
    size: btnSize = 'mid',
    icon,
    shape,
    extraCls,
    extraStyle,
    disabled,
    danger,
    children,
    onClick,
    href,
    target = '_blank',
    loading,
    ...otherProps
  } = props;

  const cls = useMemo(() => {
    return classnames(
      prefixCls,
      extraCls,
      bem({disabled}),
      bem({[`type-${btnType}`]: true}),
      bem({[`size-${btnSize}`]: true}),
      bem({[shape]: shape}),
      bem({'danger': danger}),
    )
  }, [prefixCls, extraCls, btnType, btnSize, disabled, shape, danger]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (loading || disabled) return null;
    if (href) window.open(href, target);
    onClick && onClick(e);
  }, [loading, disabled,  href, target, onClick])

  return (
    <button
      className={cls}
      style={extraStyle}
      onClick={handleClick}
      {...otherProps}
    >
      {/* 按钮高亮蒙版 */}
      <div className={bem('highlight-overlay')}></div>

      {/* icon */}
      {icon && <div className={bem('icon-container')}>{icon}</div>}

      {/* 内容 */}
      {children && <div className={bem('children-container')}>{children}</div>}

      {/* loading */}
      {loading && <div className={bem('loading-container')}><LoadingOutlined /></div>}
    </button>
  )
}
export default Button;