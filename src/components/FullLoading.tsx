/*
 * @description: 全屏loading
 * @Date: 2021-08-08 22:49:49
 * @LastEditTime: 2022-04-04 14:24:04
 */
import styled from "@emotion/styled";
import { Spin } from "antd";
import { DevTools } from "jira-dev-tool";
import React from "react";
import { ErrorBox } from "components/ErrorBox";

const FullScreen = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullLoading = () => (
  <FullScreen>
    <Spin size={"large"} />
  </FullScreen>
);

export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullScreen>
    <DevTools />
    <ErrorBox error={error}/>
  </FullScreen>
);
