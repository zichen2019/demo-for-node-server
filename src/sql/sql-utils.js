const { query } = require('./query')

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
 * @param {*} data                    需要更新的数据
 */
exports.updateData = async function(options, data) {
  
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