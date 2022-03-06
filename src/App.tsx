/*
 * @description:
 * @Date: 2021-08-01 01:42:53
 * @LastEditTime: 2022-03-05 22:54:52
 */

import { AuthApp } from "AuthApp";
import { useAuth } from "context/auth-context";
import React from "react";
import { Fragment } from "react";
import { UnAuthApp } from "unauth-app";

export const App = () => {
  const { user } = useAuth();
  return <Fragment>{user ? <AuthApp /> : <UnAuthApp />}</Fragment>;
};
