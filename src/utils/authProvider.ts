/*
 * @description:
 * @Date: 2021-07-25 23:46:31
 * @LastEditTime: 2021-08-01 11:13:07
 */

import { User } from "types/User";

export const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
};
