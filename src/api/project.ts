/*
 * @description: 获取项目列表的hooks
 * @Date: 2022-04-04 12:08:47
 * @Author: xingheng
 */
import { useHttp } from "api/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Project } from "types/Project";

/**
 * @description: 获取项目列表
 */
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  return useQuery(["projects", param], () =>
    client("projects", { data: param })
  );
};

/**
 * @description: 编辑项目
 */
export const useEditProject = (params?: Partial<Project>) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: { ...params, personId: Number(params.personId) },
      }),
    {
      // 成功后重新获取数据
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

/**
 * @description: 新增项目
 */
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

/**
 * @description: 项目详情
 */
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () =>
      client(`projects/${id}`, {
        method: "GET",
      }),
    {
      // 之后id有值的时候，才触发操作
      enabled: Boolean(id),
    }
  );
};
