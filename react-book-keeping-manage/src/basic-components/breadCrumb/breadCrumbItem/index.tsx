import React, { FC } from 'react';


interface BreadCrumbItemProps {
  /**
   * 分隔符
   */
  separator?: React.ReactNode,
  /**
   * 面包屑子节点渲染函数
   */
  itemRender?: (param: object) => React.ReactNode,
  /**
   * 自定义类
   */
  extraCls?: string,
  /**
   * 跳转链接
   */
  href?: string,
  /**
   * 自定义事件
   */
  onClick?: React.MouseEventHandler,
}