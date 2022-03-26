/*
 * @description: auth的 context
 * @Date: 2022-03-04 21:32:54
 * @Author: xingheng
 */

import { ReactNode, useCallback } from "react";
import { login as fetchLogin } from "api/auth-fetch";
import * as authApi from "api/auth";
import React from "react";
import { User } from "screens/project-list/List";
import { getToken } from "utils/authProvider";
import { http } from "api/api";
import { useMount } from "hooks/useMount";
import { useAsync } from "hooks/useAsync";
import { FullLoading, FullPageError } from "components/UI/FullLoading";

export interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => void;
    }
  | undefined
>(undefined);

// 主要用于devtool 对项目本身没作用
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    run,
    isLoading,
    isIdle,
    isError,
    error,
    data: user,
    setData: setUser,
  } = useAsync<User | null>();

  const init = useCallback(() => {
    // bootstrapUser().then(setUser);
    void run(bootstrapUser());
  }, [run]);

  useMount(init);

  // point free
  const login = (form: AuthForm) => fetchLogin(form).then(setUser);
  const register = (form: AuthForm) =>
    authApi.register(form).then((user) => setUser(user));
  const logout = () => authApi.logout().then(() => setUser(null));

  return isLoading || isIdle ? (
    <FullLoading />
  ) : isError ? (
    <FullPageError error={error} />
  ) : (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth only be used in AuthProvider");
  }
  return context;
};
