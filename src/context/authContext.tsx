/*
 * @description:
 * @Date: 2021-07-31 23:09:36
 * @LastEditTime: 2021-08-08 23:21:23
 */
import { AuthControl } from "api";
import { get } from "api/http";
import { FullLoading, FullPageError } from "components/UI/FullLoading";
import { useAsync } from "hooks/useAsync";
import { useMount } from "hooks/useMount";
import React, { ReactNode } from "react";
import { User } from "screens/project-list/List";
import { getToken } from "utils/authProvider";
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext"; // 主要用于devtool 对项目本身没作用

export interface AuthForm {
  username: string;
  password: string;
}

const initUser = async () => {
  const token = getToken();
  let user = null;
  if (token) {
    // 如果有token 再次请求初始化
    const response = await get<User>("/me");
    user = response;
  }
  return user;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    run,
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    setData: setUser,
  } = useAsync<User | null>();
  useMount(() => {
    run(get<User>("/me"));
    // initUser().then(setUser);
  });

  // point free
  const login = (form: AuthForm) => AuthControl.login(form).then(setUser);
  const register = (form: AuthForm) => AuthControl.register(form).then(setUser);
  const logout = () => AuthControl.logout().then(() => setUser(null));

  if (isIdle || isLoading) {
    return <FullLoading></FullLoading>;
  }

  if (isError) {
    return <FullPageError error={error}></FullPageError>;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider中使用");
  } else {
    return context;
  }
};
