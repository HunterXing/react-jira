/*
 * @description: 新增/编辑 项目弹窗
 * @Date: 2022-03-26 19:59:11
 * @Author: xingheng
 */
import { Drawer, DrawerProps } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModel,
  selectProjectModelVisible,
} from "./ProjectList.slice";

export interface ModelProps extends DrawerProps {}

export const ProjectModel = () => {
  const dispatch = useDispatch();
  const modelVisible = useSelector(selectProjectModelVisible);
  const modelParams = useSelector(selectProjectModel);

  return (
    <Drawer
      title={modelParams.title}
      onClose={() => dispatch(projectListActions.closeProjectModel())}
      visible={modelVisible}
      width={"100%"}
    >
      这是一个新增/编辑项目的弹窗
    </Drawer>
  );
};
