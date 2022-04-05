/*
 * @description: 没数据
 * @Date: 2022-04-05 16:49:49
 * @Author: xingheng
 */
import React from "react";
import styled from "@emotion/styled";
import { Empty, EmptyProps } from "antd";

interface NoDataProps extends EmptyProps {
  height?: string;
}
export const NoData = (props: NoDataProps) => {
  return (
    <NoDataWrap>
      <Empty description={false} {...props} />
    </NoDataWrap>
  );
};

const NoDataWrap = styled.div<NoDataProps>`
  width: 100%;
  height: ${(props) => props.height || "calc(100vh - 30rem)"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999;
`;
