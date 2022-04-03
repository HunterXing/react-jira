/*
 * @description: project模态框状态
 * @Date: 2022-04-03 20:49:38
 * @Author: xingheng
 */

import useQueryParam from "./useQueryParam";

const useProjectModel = () => {
  const [{ projectCreate, projectEdit }, setProject] = useQueryParam([
    "projectCreate",
    "projectEdit",
  ]);
  // const [{ projectEdit }, setProjectEdit] = useQueryParam(['projectEdit']);
  const open = () => setProject({ projectCreate: "true" });
  const close = () => setProject({ projectCreate: "false" });
  const setIsEdit = () =>
    setProject({ projectEdit: "true", projectCreate: "true" });

  return {
    projectModelOpen: projectCreate === "true",
    projectModelIsEdit: projectEdit === "true",
    open,
    close,
    setIsEdit,
  };
};

export default useProjectModel;
