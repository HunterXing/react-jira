/*
 * @description: 任务相关ts
 * @Date: 2022-04-05 13:56:25
 * @Author: xingheng
 */
import { useHttp } from "api/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Task, TaskType } from "types/Task";

export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    client(`tasks`, {
      method: "GET",
      data: params,
    })
  );
};

export const useTaskType = () => {
  const client = useHttp();
  return useQuery<TaskType[]>("taskTypes", () =>
    client("taskTypes", {
      method: "GET",
    })
  );
};

export const useAddTask = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );
};

/**
 * @description: 根据id获取任务详情
 * @param {String} taskId
 * @return {*}
 */
export const useTask = (taskId?: string | number) => {
  const client = useHttp();
  return useQuery<Task>(["task", taskId], () => client(`tasks/${taskId}`));
};

export const useEditTask = () => {
  const client = useHttp();
  return useMutation((params: Partial<Task>) =>
    client(`tasks/${params.id}`, {
      method: "PATCH",
      data: params,
    })
  );
};
