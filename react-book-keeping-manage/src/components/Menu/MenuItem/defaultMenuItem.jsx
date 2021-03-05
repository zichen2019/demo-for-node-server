import { Menu } from 'antd';

const MenuItem = Menu.Item;

const defaultMenuItem = ({
  key,
  icon,
  menuName
}) => (
  <MenuItem
    key={key}
    icon={icon}
  >
    {menuName}
  </MenuItem>
)

export default defaultMenuItem;