const MAX_SAFE_INTEGER = 9007199254740991;
const hasOwnProperty = Object.prototype.hasOwnProperty;

// 字符串添加引号
const addQuotation = function (str) {
  if (!str) return '';

  return "'" + str.replace(/^['"]|['"]$/g, '') + "'";
}

// 获取变量的类型字符串
const getTag = function (value) {
  return Object.prototype.toString.call(value);
}

// 判断是否为类数组
const isArrayLike = function (value) {
  return value != null && typeof value !== 'function' && isLength(value.length);
}

// 判断是否为arguments对象
const isArguments = function (value) {
  return isArrayLike(value) && getTag(value) === '[Object Arguments]'
}

// 判断是否为空
const isEmpty = function (value) {
  // 判断是否为类数组
  if (isArrayLike(value) && (
    Array.isArray(value) ||
    typeof value === 'string' ||
    typeof value.splice === 'function' ||
    isArguments(value)
  )) {
    return !value.length;
  }

  // 判断是否是Map或者Set
  const tag = getTag(value);
  if (tag === '[Object Map]' || tag === '[Object Set]') {
    return !value.size;
  }

  // 判断是否是原型对象（即一个函数或者prototype指向的值）
  if (isPrototype (value)) {
    return !Object.keys(value).length;
  }

  // 判断对象本身是否有属性
  for (let key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }

  return true;
}

// 判断length属性是否合法
const isLength = function (value) {
  return typeof value === 'number' &&
    value > - 1 && value % 1 === 0 && value < MAX_SAFE_INTEGER;
}

// 判断是否为原型对象
const isPrototype = function (value) {
  const c = value && value.constructor;
  const cPrototype = (typeof c === 'function' && c.prototype) || Object.prototype;

  return value === cPrototype;
}

module.exports = {
  addQuotation,
  getTag,
  isArrayLike,
  isArguments,
  isEmpty,
  isLength,
  isPrototype,
}