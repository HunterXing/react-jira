/*
 * @description: auth的 context
 * @Date: 2022-03-04 21:32:54
 * @Author: xingheng
 */

import { ReactNode, useCallback } from "react";
import React from "react";
import { User } from "screens/project-list/List";
import { getToken } from "utils/authProvider";
import { http } from "api/api";
import { useMount } from "hooks/useMount";
import { useAsync } from "hooks/useAsync";
import { FullLoading, FullPageError } from "components/UI/FullLoading";
import {
  selectUser,
  storeLogin,
  storeRegister,
  storeLogout,
  storeBootstrapUser,
} from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const { run, isLoading, isIdle, isError, error } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const init = useCallback(() => {
    void run(dispatch(storeBootstrapUser()));
  }, [dispatch, run]);

  useMount(init);

  return isLoading || isIdle ? (
    <FullLoading />
  ) : isError ? (
    <FullPageError error={error} />
  ) : (
    <div>{children}</div>
  );
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const login = useCallback(
    (form: AuthForm) => dispatch(storeLogin(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(storeRegister(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(storeLogout()), [dispatch]);
  const user = useSelector(selectUser);
  return { user, login, register, logout };
};
