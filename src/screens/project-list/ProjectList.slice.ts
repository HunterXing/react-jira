/*
 * @description: 项目相关状态的 slice
 * @Date: 2022-03-27 21:49:59
 * @Author: xingheng
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  modelVisible: boolean;
  title: string;
}

const initialState: State = {
  modelVisible: false,
  title: "新增项目",
};

export const projectListSlice = createSlice({
  name: "projectlistSlice", // 标记作用，在项目中不会起多大作用
  initialState,
  reducers: {
    // redux-toolkit 采用 immer 会返回新的对象, 不会修改原对象
    openProjectModel(state) {
      state.modelVisible = true;
    },
    openEditProjectModel(state, action) {
      state.modelVisible = true;
      state.title = "编辑项目";
    },
    closeProjectModel(state) {
      state.modelVisible = false;
      state.title = "新增项目";
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModelVisible = (state: RootState) =>
  state.projectList.modelVisible;
export const selectProjectModel = (state: RootState) => state.projectList;
