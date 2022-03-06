/*
 * @description: 登录
 * @Date: 2021-08-01 01:23:31
 * @LastEditTime: 2021-08-02 23:19:06
 */

import React, { Fragment } from "react";
import { AuthForm, useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { LongButton } from "unauth-app";
import { useAsync } from "hooks/useAsync";
export const LoginScreen = () => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync();

  const handleSubmit = async (form: AuthForm) => {
    await run(login(form));
  };
  return (
    <Fragment>
      {user ? <span>登录成功 用户名{user?.name}</span> : null}
      <Form onFinish={handleSubmit}>
        <FormItem
          name={"username"}
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder={"用户名"} type="text" id={"username"} />
        </FormItem>
        <FormItem
          name={"password"}
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input placeholder={"密码"} type="password" id={"password"} />
        </FormItem>
        <FormItem>
          <LongButton htmlType={"submit"} type={"primary"} loading={isLoading}>
            登录
          </LongButton>
        </FormItem>
      </Form>
    </Fragment>
  );
};
