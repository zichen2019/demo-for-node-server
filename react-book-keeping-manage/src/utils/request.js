import axios from 'axios';
import { catchNormalErr, getSession, removeAccessToken, removeAllCookie, setSession } from '@/utils'
// import { response } from 'express';

const checkStatus = function (response) {
  console.log(response, 'res=');

  return response;
}

const getEnvConfig = function () {
  return {
    API_HOST: 'http://localhost:8081',
  }
}

// 获取token
const getAccessToken = function () {}

const request = function(url, options) {
  // 补充配置项
  const restOptions = arguments.length <= 2 || arguments[2] == null ? {} : arguments[2];

  const _getEnvConfig = getEnvConfig();
  const API_HOST = _getEnvConfig.API_HOST;
  // const AUTH_SELF_URL = _getEnvConfig.AUTH_SELF_URL;
  // const LOGIN_URL = _getEnvConfig.LOGIN_URL;
  // const HZERO_OAUTH = _getEnvConfig.HZERO_OAUTH;
  let headers = {
    Pragma: 'no-cache',
    'Cache-Control': 'no-cache',
  }

  // 设置头查询参数
  if (
    options.method === 'POST' ||
    options.method === 'PUT' ||
    options.method === 'DELETE' ||
    options.method === 'PATCH'
  ) {
    const opts = {
      Accept: 'application/json'
    }

    if (!(options.body instanceof FormData)) {
      opts.ContentType = 'application/json; charset=utf-8';
      options.body = options.body ? JSON.stringify(options.body) : '{}';
    }

    headers = Object.assign({}, headers, opts);
  }

  const accessToken = getAccessToken();
  if (accessToken) {
    headers = Object.assign({}, headers, {
      Authorization: 'Bearer '.concat(accessToken)
    });
  }

  const defaultOptions = {
    // credentials: 'include', // 是否传递cookies？不传递则不允许设置credentials字段
    headers
  }

  // 合并参数
  const reqUrl = !url.startsWith('/api') && !url.startsWith('http') ? ''.concat(API_HOST).concat(url) : url;
  const reqOptions = Object.assign({}, defaultOptions, options, {url: reqUrl});

  let axiosChain = axios(reqOptions).then(checkStatus).then(function(response) {
    if (response.status === 204) return {};
    return response;
  })

  if (restOptions.beforeCatch) axiosChain.catch(restOptions.beforeCatch)

  axiosChain.catch(catchNormalErr).catch(function(e) {
    const status = e.name;
    // const language = getSession('language') || 'zh_CN';

    // isErrorFLag 用于处理第一个401
    const isError = getSession('isErrorFlag'); // 获取当前的session isErrorFlag
    if (!isError) {
      // 如果没有isErrorFlag的session, 设置为false
      setSession('isErrorFLag', false);
    }

    if (status === 401) {
      let cacheLocation = encodeURIComponent(window.location.toString());

      if (accessToken) {
        request(''.concat('public/token/validToken'), {
          method: 'GET',
          query: {
            access_token: accessToken,
          }
        }).then(function(response) {
          console.log('response=', response);
        });

        return;
      }
      
      removeAccessToken();
      removeAllCookie();

      if (reqUrl.indexOf(AUTH_SELF_URL) !== -1) {
        // 如果是self接口401，跳转到登录页面
        // 判断login url
        window.location.href = 
          ''.concat(LOGIN_URL)
            .concat(LOGIN_URL.includes('?') ? '&redirect_uri=' : '?redirect_uri')
            .concat(cacheLocation); // 401需要在登录后返回之前的访问页面

        setSession('isErrorFlag', false);
        setSession('redirectUrl', cacheLocation);

        return;
      }

      if (!Error) {
        // 其他接口401，跳转到登录页面
        setSession('isErrorFlag', true)
        setSession('redirectUrl', cacheLocation);
      }

      return;
    }

    if (reqUrl.indexOf(AUTH_SELF_URL) !== -1) {
      // self 接口报错后，需要跳转到报错页面
      return e;
    }

    if (status === 'TypeError') {
      alert('网络异常，请稍后重试');
      return;
    }

    if (status === 501) {}
  })

  return axiosChain;
}


export default request;