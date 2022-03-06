/*
 * @description:
 * @Date: 2021-08-01 01:23:24
 * @LastEditTime: 2021-08-02 22:33:52
 */
import { Button, Card, Divider } from "antd";
import React, { useState } from "react";
import { LoginScreen } from "./Login";
import { RegisterScreen } from "./Register";
import styled from "@emotion/styled";
import logoSvg from "assets/images/logo.svg";
import leftSvg from "assets/images/left.svg";
import rightSvg from "assets/images/right.svg";
import useDocumentTitle from "hooks/useDocumentTitle";

export const UnAuthApp = () => {
  const [isLogin, setIsLogin] = useState(true);
  // useDocumentTitle("请登录以继续");
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard style={{ width: "35%" }}>
        <Title>{isLogin ? "登录" : "注册"}</Title>
        {isLogin ? <LoginScreen /> : <RegisterScreen />}
        <Divider />
        <LongButton type="link" onClick={() => setIsLogin(!isLogin)}>
          切换到{!isLogin ? "登录" : "注册"}
        </LongButton>
      </ShadowCard>
    </Container>
  );
};

const Title = styled.h2`
  text-align: center;
  color: #999;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Header = styled.div`
  background: url(${logoSvg}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${leftSvg}), url(${rightSvg});
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
