import { Menu } from 'antd';
import MenuItem from './MenuItem';

const renderMenu = ({
  mode = 'inline',
  theme = 'dark',
  onCollapse,
  menuList = [
    {key: 1, icon: '', menuName: '菜单1'},
    {key: 2, icon: '', menuName: '菜单2'},
    {key: 3, icon: '', menuName: '菜单3'},
    {key: 5, icon: '', menuName: '菜单5'}
  ],
  menuItemRender,
  defaultSelectedKeys = ['1']
}) => 
  {
    return Array.isArray(menuList) && 
    menuList.length > 0 &&
    (
      <Menu
        mode={mode}
        theme={theme}
        // onCollapse={onCollapse}
        defaultSelectedKeys={defaultSelectedKeys}
      >
        {menuList.map(menuProps => MenuItem(menuProps, menuItemRender))}
      </Menu>
    ) || null;
  }
  
export default renderMenu;