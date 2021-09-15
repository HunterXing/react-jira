/*
 * @description:
 * @Date: 2021-07-31 23:09:13
 * @LastEditTime: 2021-08-03 22:26:30
 */

import React from "react";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./authContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
