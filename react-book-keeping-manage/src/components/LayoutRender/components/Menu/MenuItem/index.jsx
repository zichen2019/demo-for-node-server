import defaultMenuItem from './defaultMenuItem';

const renderMenuItem = (defaultMenuItem) => (menuItemProps, menuItemRender) => {
  console.log('menuItemProps=', menuItemProps)
  const defaultDom = defaultMenuItem(menuItemProps);
  return menuItemRender ? menuItemRender(menuItemProps, defaultDom) : defaultDom;
}

export default renderMenuItem(defaultMenuItem)