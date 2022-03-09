/*
 * @description: project.ts
 * @Date: 2022-03-07 23:03:21
 * @Author: xingheng
 */

import { useAsync } from "hooks/useAsync";
import { useHttp } from "api/api";
import { Project } from "screens/project-list/index";

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();

  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      })
    );
  };

  return {
    mutate,
    ...asyncResult,
  };
};
