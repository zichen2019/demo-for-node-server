export function isValidArray(list) {
  return Array.isArray(list) && list.length > 0;
};

export function classnames () {
  const list = Array.from(arguments).flat(Infinity).filter(Boolean);
  
  const cNames = list.reduce((arr, item) => {
    if (typeof item === 'string') {
      return arr.concat([item]);
    }

    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return arr.concat(
        Object.keys(item).map(attr => item[attr] && attr).filter(Boolean)
      )
    }
  }, []);
  return cNames && cNames.join(' ');
}