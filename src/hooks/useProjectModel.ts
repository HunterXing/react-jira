/*
 * @description: project模态框状态
 * @Date: 2022-04-03 20:49:38
 * @Author: xingheng
 */

import useQueryParam from "./useQueryParam";
import { useProject } from "hooks/useProject";

const useProjectModel = () => {
  const [{ projectCreate }, setProject] = useQueryParam(["projectCreate"]);

  const [{ projectEditId }, setProjectEditId] = useQueryParam([
    "projectEditId",
  ]);
  const { data: projectDetail, isLoading } = useProject(Number(projectEditId));

  const open = () => setProject({ projectCreate: "true" });
  const close = () => setProject({ projectCreate: "false" });

  return {
    projectModelOpen: projectCreate === "true" || Boolean(projectEditId),
    projectModelIsEdit: Boolean(projectEditId),
    open,
    close,
    setProjectEditId,
    projectEditId,
    projectDetail,
    isLoading,
  };
};

export default useProjectModel;
