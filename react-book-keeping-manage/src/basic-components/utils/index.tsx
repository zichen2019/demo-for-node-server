const DEFAULT_PREFIX = 'basic'

export const createNamespace = function(name?: string) {
  const prefixName = DEFAULT_PREFIX + '-' + name;

  return [prefixName, createSuffix(prefixName)]
}

const createSuffix = function(namespace?: string) {
  return function () {
    // 获取传参
    const _args = Array.prototype.slice.call(arguments);
    const suffix = _args.reduce(function(cls, arg) {
      if (!arg) return cls;

      if (typeof arg === 'string') {
        return cls + '__' + arg;
      }

      return cls + gen(arg);
    }, '');

    return suffix ? namespace + suffix : suffix;
  }
}

const gen = function(el: any): any {
  // el 是数组类型
  if (Array.isArray(el)) {
    return el.reduce((strs, item) => {
      if (item && typeof item === 'string') {
        return strs + '--' + item;
      }
      return strs + gen(item);
    }, '');
  }

  return Object.keys(el).reduce((strs, key) => el[key] ? strs + '--' + key : strs, '');
}



// 