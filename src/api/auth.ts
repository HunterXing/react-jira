/*
 * @description: 登录和注册相关
 * @Date: 2021-07-25 22:59:31
 * @LastEditTime: 2021-08-01 11:11:37
 */
import { message } from "antd";
import { AuthForm } from "context/auth-context";
import { handleUserResponse, localStorageKey } from "utils/authProvider";
import { post } from "./http";
import { User } from "types/User";
export interface Response {
  msg: string;
  code: number;
  data?: any;
}

/**
 * @description: 登录
 * @param {string} username
 * @param {string} password
 * @return {*}
 */
export const login = async (authForm: AuthForm): Promise<User> => {
  const response = await post(`/login`, authForm);
  if (response.data.user) {
    handleUserResponse(response.data.user as User); // 成功之后设置token
    message.success("登录成功");
    return Promise.resolve(response.data.user as User);
  } else {
    return Promise.reject(authForm);
  }
};

/**
 * @description: 注册
 * @param {string} username
 * @param {string} password
 * @return {*}
 */
export const register = async (authForm: AuthForm): Promise<User> => {
  const response = await post(`/register`, authForm);
  if (response.data.user) {
    handleUserResponse(response.data.user as User); // 成功之后设置token
    return Promise.resolve(response.data.user as User);
  } else {
    return Promise.reject(authForm);
  }
};

/**
 * @description: 登出
 * @param {*}
 * @return {*}
 */
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
