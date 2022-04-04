/*
 * @description: 错误
 * @Date: 2022-04-04 14:15:39
 * @Author: xingheng
 */
import React from 'react'
import { Typography } from "antd"


// 类型守卫
const isError = (value: any): value is Error => value?.message

export const ErrorBox = ({ error }: { error: unknown }) => {
  if(isError(error)) {
    return (<Typography.Text type={"danger"}>{error?.message}</Typography.Text>)
  }
  return null
}
