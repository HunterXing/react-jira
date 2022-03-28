/*
 * @description: 权限控制的状态切片
 * @Date: 2022-03-27 22:43:07
 * @Author: xingheng
 */
import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/List";
import { login, logout, register } from "api/auth";
import { AuthForm, bootstrapUser } from "context/auth-context";
import { AppDispatch, RootState } from "store";

interface State {
  user: User | null;
}

const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const storeLogin = (authForm: AuthForm) => {
  return (dispatch: AppDispatch) => {
    return login(authForm).then((user) => {
      return dispatch(setUser(user));
    });
  };
};

export const storeRegister = (authForm: AuthForm) => {
  return (dispatch: AppDispatch) => {
    return register(authForm).then((user) => {
      return dispatch(setUser(user));
    });
  };
};

export const storeLogout = () => (dispatch: AppDispatch) =>
  logout().then(() => dispatch(setUser(null)));
export const storeBootstrapUser = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));
