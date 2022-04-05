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
import { SpinSize } from "antd/lib/spin/index";

interface FullScreenProp {
  height?: string;
}

const FullScreen = styled.div<FullScreenProp>`
  width: 100%;
  height: ${(props) => props.height || "100vh"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullLoading = ({height="100vh", size="large"}: {height?:string, size?: SpinSize}) => (
  <FullScreen height={height}>
    <Spin size={size} />
  </FullScreen>
);

export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullScreen>
    <DevTools />
    <ErrorBox error={error}/>
  </FullScreen>
);
