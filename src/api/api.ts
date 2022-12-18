/*
 * @description: 封装 fetch
 * @Date: 2022-03-05 20:06:42
 * @Author: xingheng
 */

import qs from "qs";
import { logout } from "api/auth";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface HttpConfig extends RequestInit {
  data?: object;
  token?: string;
}

/**
 * @description:
 * @param {string} endpoint
 * @param {*} param2
 * @return {*}
 */
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: HttpConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    ...customConfig,
  };

  // get请求的话，拼接在url里
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 没权限则退出
      if (response.status === 401) {
        await logout();
        window.location.reload();
        return Promise.reject({
          message: "没有权限",
        });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (
    endpoint: string,
    { data, token, ...customConfig }: HttpConfig = {}
  ) => {
    return http(endpoint, {
      data,
      token: user?.token,
      ...customConfig,
    });
  };
};
