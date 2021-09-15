/*
 * @description:
 * @Date: 2021-07-25 23:58:48
 * @LastEditTime: 2021-08-07 15:26:35
 */

/**
 * 网络请求配置
 */
import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken } from "utils/authProvider";
import { message } from "antd";
import to from "utils/toAsync";
import { logout } from "./auth";
import { resolveParams } from "utils";
const apiUrl = process.env.REACT_APP_API_URL;
// json格式的请求 常规
const http = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 传统formdata表单类型的请求(适用于文件上传)
const httpForm = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

/**
 * http request  请求拦截器
 */
http.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken();
    config.data = JSON.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http request  请求拦截器
 */
httpForm.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getToken();
    config.data = JSON.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 响应拦截器
 */
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    return new Promise((resolve, reject) => {
      errmsg(error);
      reject(error);
    });
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export const get = <D>(url: string, params = {}): Promise<D> => {
  url = resolveParams(url, params);
  return new Promise<D>(async (resolve, reject) => {
    const [err, response] = await to(http.get(url));
    !err ? resolve(response.data as D) : reject(err);
  });
};

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export const post = (url: string, data = {}): Promise<AxiosResponse> => {
  return new Promise(async (resolve, reject) => {
    const [err, response] = await to(http.post(url, data));
    !err ? resolve(response) : resolve({ data: {} } as AxiosResponse<any>);
  });
};

/**
 * @description: formdata文件格式接口
 * @param {string} url
 * @param {*} data
 * @return {*}
 */
export function postForm(url: string, data: FormData): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    httpForm.post(url, data).then(
      (response) => {
        resolve(response);
      },
      (err) => {
        errmsg(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    http.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        errmsg(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    http.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        errmsg(err);
        reject(err);
      }
    );
  });
}

//失败提示
const errmsg = (err: AxiosError): void => {
  if (err && err.response) {
    if (err.response.status === 401) {
      // message.error(err.response.data.message);
      message.error("未授权，请登录");
      logout();
      window.location.reload();
    } else {
      message.error(err.response.data.message);
    }
  }
};

// export const errorTips = (status: number) => {
//   switch (status) {
//     case 401:
//       message.error("未授权，请登录");
//       logout();
//       window.location.reload();
//       break;

//     case 403:
//       message.error("拒绝访问");
//       break;

//     case 404:
//       message.error("请求地址出错");
//       break;

//     case 408:
//       message.error("请求超时");
//       break;

//     case 500:
//       message.error("服务器内部错误");
//       break;

//     case 501:
//       message.error("服务未实现");
//       break;

//     case 502:
//       message.error("网关错误");
//       break;

//     case 503:
//       message.error("服务不可用");
//       break;

//     case 504:
//       message.error("网关超时");
//       break;

//     case 505:
//       message.error("HTTP版本不受支持");
//       break;
//     default:
//   }
// };
