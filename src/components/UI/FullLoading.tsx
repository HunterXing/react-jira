/*
 * @description: 全屏loading
 * @Date: 2021-08-08 22:49:49
 * @LastEditTime: 2021-08-08 23:14:10
 */
import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import React from "react";

const FullScreen = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullLoading = () => (
  <FullScreen>
    <Spin size={"large"}></Spin>
  </FullScreen>
);

export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullScreen>
    <DevTools />
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullScreen>
);
