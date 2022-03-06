/*
 * @description:
 * @Date: 2021-08-09 20:33:30
 * @LastEditTime: 2021-08-09 20:34:17
 */
import React from "react";
import { Link, Routes } from "react-router-dom";
import { Route, Navigate } from "react-router";
import { Panel } from "screens/panel/index";
import { Epic } from "screens/epic";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>projectScreen</h1>
      <Link to={"panel"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"panel"} element={<Panel />} />
        <Route path={"epic"} element={<Epic />} />
        <Navigate to={`${window.location.pathname}/panel`} />
      </Routes>
    </div>
  );
};
