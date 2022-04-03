/*
 * @description: 新增/编辑 项目弹窗
 * @Date: 2022-03-26 19:59:11
 * @Author: xingheng
 */
import { Drawer, DrawerProps } from "antd";
import useProjectModel from "hooks/useProjectModel";
import React from "react";

export interface ModelProps extends DrawerProps {}

export const ProjectModel = () => {
  const { projectModelOpen, close, projectModelIsEdit } = useProjectModel();
  return (
    <Drawer
      title={!projectModelIsEdit ? "新增项目" : "编辑项目"}
      onClose={close}
      visible={projectModelOpen}
      width={"100%"}
    >
      这是一个新增/编辑项目的弹窗
    </Drawer>
  );
};
