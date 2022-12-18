/*
 * @description: 任务类型的下拉
 * @Date: 2022-04-05 16:12:17
 * @Author: xingheng
 */
import React from "react";
import { IdSelect } from "components/IdSelect";
import { useTaskType } from "api/task";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: tasks } = useTaskType();
  return <IdSelect options={tasks || []} {...props} />;
};
