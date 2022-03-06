/*
 * @description:
 * @Date: 2021-07-31 23:09:13
 * @LastEditTime: 2022-03-04 22:03:03
 */

import React from "react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
