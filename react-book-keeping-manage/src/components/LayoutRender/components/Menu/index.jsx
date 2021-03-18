import { Menu } from 'antd';
import MenuItem from './MenuItem';
import mNameList from '@/mock/menu.json';

const compileMenu = (routes) => {
  return Array.isArray(routes) ?
    routes.map((route, index) => {
      if (route.path === '/' && route.routes) {
        return compileMenu(route.routes);
      }

      if (route.name) {
        const menu = {
          ...route,
          key: route.name,
          name: 
            mNameList[route.name] || 
            `${route.name.substr(0, 1).toUpperCase()}${route.name.substr(1)}`,
        };
        if (route.routes) {
          menu.children = compileMenu(route.routes);
        }
        return menu;
      }

      return false;
    }).filter(Boolean)
    : []
}

const renderMenu = ({
  mode = 'inline',
  theme,
  routes,
  menuItemRender,
  defaultOpenKeys,
  defaultSelectedKeys
}) => {
  const menuRoutes = routes.filter(route => route.path === '/');
  if (
    menuRoutes.length === 0 ||
    !Object.prototype.hasOwnProperty.call(menuRoutes[0], 'routes')
  ) return null;

  const menus = compileMenu(menuRoutes[0].routes);

  if (menus.length === 0) return null;

  console.log('menus=', menus)
  defaultOpenKeys = menus[0].key;
  defaultSelectedKeys = menus[0].children[0]?.key;

  return (
    <Menu
      mode={mode}
      theme={theme}
      // onCollapse={onCollapse}
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
    >
      {menus.map(menuProps => MenuItem(menuProps, menuItemRender))}
    </Menu>
  );
}
  
export default renderMenu;