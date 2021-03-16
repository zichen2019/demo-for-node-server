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

export function isPrimitive (n) {
  return typeof n === 'number' || typeof n === 'string';
}

export function getResponse (response, errCallback) {
  if (response && response.failed) {
    if (errCallback) {
      errCallback(response);
    } else {
      const msg = {
        message: '操作失败',
        description: response.message
      }
      return msg;
    }
  } else {
    return response;
  }
}