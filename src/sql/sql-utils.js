const { query } = require('./query');
const { addQuotation, isEmpty } = require('../utils/utils');
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 删除数据库
 * @param {collection_object} connection    数据库连接对象
 * @param {string} dbaName                  要执行操作的目标数据库名称
 */
const DropDatabase = function (connection, dbaName) {
  const sqlStr = 'DROP DATABASE '.concat(dbaName);
  return new Promise(function(resolve, reject) {
    queryDatabase(connection, sqlStr, resolve, reject)
  }).catch(function(err) {
    console.log('删除数据库'.concat(dbaName).concat('失败！原因如下：'))
    console.log(err)
  })
}


/**
 * 创建数据表
 * @param {*} connection              数据库连接对象
 * @param {*} options                 创建数据表的字段配置表
 */
exports.createTable = function (connection, options) {
  let sql_opts = '';

  // 注册表字段
  for(let key in options) {
    if (key === 'tbName' || key === 'primaryId') continue;
    sql_opts += key + ' ' + options[key] + ', ';
  }

  if (sql_opts === '') throw Error('除主键外，新建数据表必须存在至少一个表字段');

  // 添加主键
  sql_opts += 'PRIMARY KEY (`' + options.primaryId + '`)'


  // 拼接建表字符串
  const sqlStr = 
    'CREATE TABLE IF NOT EXISTS ' +
    options.tbName +
    '(' + sql_opts + ')'+
    'ENGINE=InnoDB DEFAULT CHARSET=utf8;';

  console.log('sqlStr=', sqlStr)

  return new Promise(function(resolve, reject) {
    queryDatabase(
      connection,
      sqlStr,
      function(data) {resolve(data)},
      function(data) {reject(data)}
    )
  }).catch(function(err) {
    console.log('建表异常：', err);
  })
}


/**
 * 插入数据
 * @param {*} options                 数据库查询参数
 * @param {*} data                    需要更新的数据
 */
exports.insertData = async function (options, data) {
  try {
    const [res, fields] = await query('select * from '.concat(options.tbName));

    let INSERT_KEYS_O = {};         // 插入数据的键值对象
    let INSERT_KEYS = '';             // 插入的键-字符串
    let INSERT_VALUES = '';           // 插入的值-字符串

    INSERT_KEYS= fields.reduce(function(keys, item, index) {
      INSERT_KEYS_O[item.name] = null;
      return index === 0 ? item.name : keys + ', ' + item.name;
    }, '');

    INSERT_VALUES = data.reduce(function(values, item) {
      let value = '';
      for (let v in INSERT_KEYS_O) {
        if (value !== '') value += ', ';

        if (v in item) {
          value += typeof item[v] === 'string' ? "'" + item[v] + "'" : item[v];
          continue;
        }

        value += INSERT_KEYS_O[v];
      }

      return values !== '' 
        ? values + ', (' + value + ')'
        : '(' + value + ')';
    }, '');

    // 执行数据库插入操作
    try {
      const sql = 'INSERT INTO ' + options.tbName + '(' + INSERT_KEYS + ')' + ' VALUES' + INSERT_VALUES + ';';
      // console.log('sql=', sql);
      await query(sql)
      console.log('插入数据成功')
    } catch(err) {
      console.log('数据插入失败，error=', {code: err.code, msg: err.sqlMessage});
    }

  } catch (err) {
    console.log('err', err);
  }
  

  // // 注册表字段
  // for(let key in options) {
  //   if (key === 'tbName' || key === 'primaryId') continue;
  //   console.log('typeof=', typeof options[key])
  //   INSERT_KEYS += key + ', ';
  //   INSERT_VALUES += 
  //     options[key] && 
  //     typeof options[key] === 'string'
  //       ? "'" + options[key] + "', "
  //       : (options[key] || undefined) + ', '
  // }
  // INSERT_KEYS = INSERT_KEYS.substring(0, INSERT_KEYS.lastIndexOf(','));
  // INSERT_VALUES = INSERT_VALUES.substring(0, INSERT_VALUES.lastIndexOf(','));


  // if (INSERT_KEYS === '') throw Error('除主键外，插入数据时至少需要存在一个有效表字段');


  // // 拼接建表字符串
  // const sqlStr = 'INSERT INTO ' + options.tbName + '(' + INSERT_KEYS + ')'+ ' VALUES(' + INSERT_VALUES +');';
  // console.log('sqlStr=', sqlStr)

  // return new Promise(function(resolve, reject) {
  //   queryDatabase(
  //     connection,
  //     sqlStr,
  //     function(data) {resolve(data)},
  //     function(data) {reject(data)}
  //   )
  // }).catch(function(err) {
  //   console.log('插入数据异常', err);
  // })
}

/**
 * 更新数据
 * @param {*} options                 数据库查询参数
 * @param {*} keys                    需要更新的字段名集合
 * @param {*} data                    需要更新的数据
 * @param {*} pKyName                需要更新的行的主键名
 */
exports.updateData = async function(options, keys, data, pKyName) {
  // 当主键名未提供时，警告提示是否使用默认主键名-id
  if (!pKyName) console.warn("There has no primary key! Are you sure use key as 'id' ? ");

  if (isEmpty(data))
    throw Error('data is empty!');

  // 当要更新的字段列表为空时，取data数据里的第一条里的key集合
  const isLackUpKeys = isEmpty(keys);
  let updateKeys;
  if (isLackUpKeys) {
    const validItem = data.find(item => !isEmpty(item));
    // 不存在合法的数据项
    if (validItem == null) throw Error('update data list is illegal!');

    updateKeys = validItem;
  } else {
    updateKeys = keys.reduce((obj, item) => { obj[item] = null; return obj }, {})
  }

  const primaryKey = pKyName || 'id';

  let TEMP_TABLE = data.reduce(function (result, item) {
    // 当主键名未提供，且默认主键名id不存在对象内时，抛出错误;
    if (!hasOwnProperty.call(item, primaryKey)) {
      throw Error('Lack primary key!')
    }

    let value = 'select ' + 
        (typeof item[primaryKey] === 'string'
          ? addQuotation(item[primaryKey])
          : item[primaryKey])
        + ' as ' + primaryKey;

    let itemVal;

    for (let key in updateKeys) {
      if (key === primaryKey) continue;
      if (value !== '') value += ', ';

      itemVal = item[key] || null;
      value += 
        (typeof itemVal === 'string'
          ? addQuotation(itemVal)
          : itemVal)
        + ' as ' + key;
    }

    result += result === '' ? value : ' union ' + value;

    return result;
  }, '');

  // console.log('TEMP_TABLE=', TEMP_TABLE)


  try {
    const UPDATE_SQL = 
      'update ' + options.tbName + ' a join (' + TEMP_TABLE + ') b using (' + primaryKey + ') set ' +
        (isLackUpKeys ? Object.keys(updateKeys) : keys).reduce(function(r, i) {
          if (r !== '') r += ', ';
          r += 'a.' + i + '=b.' + i;
          return r;
        }, '');

    await query(UPDATE_SQL);
    console.log('更新数据成功')
  } catch(err) {
    console.log('更新数据异常：', {code: err.code, msg: err.sqlMessage});
  }
}


/**
 * 删除数据表中的单条数据
 * @param {*} tbName                数据库表名
 * @param {*} pKyName                  数据表的行主键名
 * @param {*} pKyVal               需要删除的行主键值
 */ 
exports.deleteSingleRecord = function(tbName, pKyName, pKyVal) {
  if (!tbName || !pKyVal) return null;

  if (!pKyName) pKyName = 'id';

  const sql = 'delete from ' + tbName + ' where ' + pKyName + ' = ' + pKyVal;

  query(sql).then(function () {
    console.log('删除数据成功！')
  }, function (err) {
    console.log('删除数据异常：', {code: err.code, msg: err.sqlMessage})
  })
}

/**
 * 批量删除数据表的数据
 * @param {*} tbName 
 * @param {*} pKyName 
 * @param {*} pKys 
 */
exports.deleteRecordBatch = function(tbName, pKyName, pKys) {
  const LIMIT_NUM = 20;

  if (isEmpty(pKys)) console.log('需要执行批量删除的集合为空!');

  if (!pKyName) pKyName = 'id';

  // 将主键列表根据LIMIT_NUM分割成若干个批量sql
  const sqls = pKys.reduce(function(o, key, index) {
    const idx = Math.floor(index / LIMIT_NUM);  // 获取当前执行操作的sql

    if (o[idx] == null) o[idx] = '';

    if (o[idx] !== '') o[idx] += ' or ';

    o[idx] += pKyName + ' = ' +
      (typeof key === 'string'
        ? addQuotation(key)
        : key);

    return o;
  }, [])

  Promise.all(sqls.map(function(sql) {
    const s = 'delete from ' + tbName + ' where ' + sql;
    return query(s); 
  })).then(function() {
    console.log('批量删除成功');
  }, function(err) {
    console.log('批量删除失败：', {code: err.code, msg: err.sqlMessage});
  }).catch(function(error) {
    console.log('操作异常:', {code: error.code, msg: error.sqlMessage});
  })
}






/**
 * 执行数据库操作
 * @param {collection_object} connection  数据库连接对象
 * @param {*} sql                         要执行的sql指令
 * @param {*} resolve
 * @param {*} reject 
 */
const queryDatabase = function(connection, sql, resolve, reject) {
  connection.query(sql, function(error, results, fields) {
    if (error) throw error;

    // console.log('删除数据库'.concat(dbaName).concat('成功！'))
    console.log('fields=', fields);

    resolve(results)
  })
}