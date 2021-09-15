/*
 * @description:
 * @Date: 2021-08-01 01:42:53
 * @LastEditTime: 2021-08-01 16:27:52
 */

import { AuthApp } from "AuthApp";
import { useAuth } from "context/authContext";
import React from "react";
import { Fragment } from "react";
import { UnAuthApp } from "UnAuthApp";

export const App = () => {
  const { user } = useAuth();
  return <Fragment>{user ? <AuthApp /> : <UnAuthApp />}</Fragment>;
};
