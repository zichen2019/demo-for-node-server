import routes from './routes';

const traversal = (item, isFlag = false) => {
  const res = {...item};
  if (isFlag && item.filterFlag) return false;

  if (item.components !== undefined) {
    res.components = getRoutes(item.components);
  }

  if (item.coverPath) {
    res.path = res.coverPath;
  }

  return res;
}

const getRoutes = (routes) => {
  return routes.map(route => traversal(route)).filter(Boolean);
}

export default () => getRoutes(routes);