import { Menu } from 'antd';
import { Link } from 'umi';
import { isValidArray } from '@/utils';

const { Item: MenuItem, SubMenu } = Menu;
 // icon={icon}
const defaultMenuItem = ({
  key,
  icon,
  name,
  children = undefined
}) => Array.isArray(children) && children.length > 0 
  ? (
    <SubMenu key={key} title={name}>
      {children.map(item => 
        isValidArray(item.children)
        ? (
          defaultMenuItem(item)
        ) : (
        <MenuItem key={item.key}>
          <Link to={item.path}>
            {item.name}
          </Link>
        </MenuItem>
      ))}
    </SubMenu>
  ) : (
    <MenuItem key={key}>
      <Link to={item.path}>
        {item.name}
      </Link>
    </MenuItem>
  )

export default defaultMenuItem;