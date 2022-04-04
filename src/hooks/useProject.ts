/*
 * @description: 获取项目列表的hooks
 * @Date: 2022-04-04 12:08:47
 * @Author: xingheng
 */

import { useHttp } from "api/api";
import { useQuery } from "react-query";
import { Project } from "screens/project-list";

export const useProject = (param? :  Partial<Project>) => {
  const client = useHttp();
  return useQuery(['projects', param], () => client('projects', {data: param}));
}

export const useEditProject = () => {

}
