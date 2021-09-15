/*
 * @description: 注册
 * @Date: 2021-08-01 01:23:31
 * @LastEditTime: 2021-08-03 22:22:21
 */

import React, { Fragment } from "react";
import { AuthForm, useAuth } from "context/authContext";
import { Form, Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { LongButton } from "unauth-app";
export const RegisterScreen = () => {
  const { register } = useAuth();
  const handleSubmit = (form: AuthForm) => {
    register(form);
  };
  return (
    <Fragment>
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
          <LongButton htmlType={"submit"} type={"primary"}>
            注册
          </LongButton>
        </FormItem>
      </Form>
    </Fragment>
  );
};
