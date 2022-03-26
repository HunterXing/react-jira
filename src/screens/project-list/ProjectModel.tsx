/*
 * @description: 新增/编辑 项目弹窗
 * @Date: 2022-03-26 19:59:11
 * @Author: xingheng
 */
import { Drawer, DrawerProps } from "antd";
import React from "react";

export interface ModelProps extends DrawerProps {}

export const ProjectModel = (props: ModelProps) => {
  return (
    <Drawer
      title={props.title || "新增项目"}
      onClose={props.onClose}
      visible={props.visible}
      width={"100%"}
    >
      这是一个新增/编辑项目的弹窗
    </Drawer>
  );
};
