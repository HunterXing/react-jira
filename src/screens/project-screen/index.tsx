/*
 * @description:
 * @Date: 2021-08-09 20:33:30
 * @LastEditTime: 2021-08-09 20:34:17
 */
import React from "react";
import { Link, Routes } from "react-router-dom";
import { Route, Navigate, useLocation } from "react-router";
import { Panel } from "screens/panel/index";
import { Epic } from "screens/epic";
import { Menu } from "antd";
import styled from "@emotion/styled";

const useSelectedKeys = () => {
  const { pathname } = useLocation();
  return pathname.split("/").slice(-1);
};

export const ProjectScreen = () => {
  const selectedKeys = useSelectedKeys();
  return (
    <Container>
      <Left>
        <Menu selectedKeys={selectedKeys} mode="inline">
          <Menu.Item key={"panel"}>
            <Link to={"panel"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Left>
      <Right>
        <Routes>
          <Route path={"panel"} element={<Panel />} />
          <Route path={"epic"} element={<Epic />} />
          <Navigate to={`${window.location.pathname}/panel`} />
        </Routes>
      </Right>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  background: #fff;
  flex-basis: 20rem;
  border-right: 2px solid #f0f0f0;
  height: calc(100vh - 7.5rem);
  .ant-menu-vertical-left {
    border-right: none !important;
  }
`;
const Right = styled.div`
  display: flex;
  flex: 1;
  padding: 0 2rem;
  overflow: hidden;
  height: calc(100vh - 7.5rem);
`;
