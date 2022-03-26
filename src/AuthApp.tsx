/*
 * @description: 登录之后的app
 * @Date: 2021-08-01 01:37:59
 * @LastEditTime: 2022-03-26 20:34:27
 */

import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import React from "react";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { Row } from "components/UI/Row";
import { Button, Dropdown, Menu, Popover } from "antd";
import { ProjectScreen } from "screens/project-screen";
import { ProjectListScreen } from "screens/project-list";
import { resetRouter } from "utils/index";

// 静态资源
import { ReactComponent as SoftwareLogo } from "assets/images/software-logo.svg";
import { ProjectModel } from "screens/project-list/ProjectModel";

export const AuthApp = () => {
  const [modelVisibility, setModelVisibility] = React.useState(false);
  return (
    <Container>
      <PageHeader
        modelVisibility={modelVisibility}
        setModelVisibility={setModelVisibility}
      />
      <Main>
        <Button onClick={() => setModelVisibility(true)}>新增</Button>
        <Router>
          <Routes>
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                  modelVisibility={modelVisibility}
                  setModelVisibility={setModelVisibility}
                />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={`/projects`} />
          </Routes>
        </Router>
      </Main>
      <ProjectModel
        visible={modelVisibility}
        onClose={() => setModelVisibility(false)}
      />
      {/* <Aside>aside</Aside> */}
      <Footer>版权所有@xing 2021</Footer>
    </Container>
  );
};

export const PageHeader = (props: {
  modelVisibility: boolean;
  setModelVisibility: (visibility: boolean) => void;
}) => {
  const { logout, user } = useAuth();
  const menu = (
    <Menu>
      <Menu.Item key={"layout"}>
        <Button type={"link"} onClick={() => logout()}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
  );

  const ProjectPopover = () => (
    <Popover placement="bottom" content={ProjectPopoverContent} trigger="click">
      <HeaderLeftItem>项目</HeaderLeftItem>
    </Popover>
  );

  const ProjectPopoverContent = () => (
    <Button
      type="text"
      style={{ padding: 0 }}
      onClick={() => props.setModelVisibility(true)}
    >
      创建项目
    </Button>
  );

  return (
    <Header justifyContent={"space-between"}>
      <HeaderLeft gap={1.5}>
        <Button type={"link"} onClick={resetRouter}>
          <SoftwareLogo width={"18rem"} />
        </Button>
        <ProjectPopover />
        <HeaderLeftItem>首页</HeaderLeftItem>
        <HeaderLeftItem>用户</HeaderLeftItem>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={menu}>
          <Button type={"link"}>hi, {user?.name}</Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
  height: 100vh;
`;
const Header = styled(Row)`
  grid-area: header;
  display: flex;
  padding: 0.5rem 1rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;
const Main = styled.main`
  grid-area: main;
  padding: 0.5rem 2rem;
`;
// const Nav = styled.nav`
//   grid-area: nav;
//   padding: 0.5rem 1rem;
// `;
// const Aside = styled.aside`
//   grid-area: aside;
//   padding: 0.5rem 1rem;
// `;
const Footer = styled.footer`
  grid-area: footer;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const HeaderLeftItem = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;
