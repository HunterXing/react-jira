/*
 * @description: 登录和注册相关 使用featch
 * @Date: 2021-07-25 22:59:31
 * @LastEditTime: 2022-03-05 20:58:59
 */
import { message } from "antd";
import { AuthForm } from "context/auth-context";
import { handleUserResponse, localStorageKey } from "utils/authProvider";
import { post } from "./http";
import { http } from "api/api";
import to from "utils/toAsync";
import { User } from "types/User";
export interface Response {
  msg: string;
  code: number;
  data?: any;
}

/**
 * @description: 登录
 * @param authForm
 */
export const login = async (authForm: AuthForm) => {
  const [error, response] = await to(
    http("login", {
      method: "post",
      data: {
        ...authForm,
      },
    })
  );
  if (error) {
    message.error(error.message);
    return Promise.reject(response);
  } else if (response.user) {
    handleUserResponse(response.user); // 成功之后设置token
    message.success("登录成功");
    return Promise.resolve(response.user);
  }
};

/**
 * @description: 注册
 * @param authForm
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
 * @return {*}
 */
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
