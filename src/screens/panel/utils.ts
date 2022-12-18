import { useTask } from "./../../api/task";
import { useLocation } from "react-router";
import { useProject } from "api/project";
import useQueryParam from "hooks/useQueryParam";
import { useCallback, useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/\/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const usePanelSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const usePanelQueryKey = () => ["kanbans", usePanelSearchParams()];

export const useTaskSearchParams = () => {
  const [param] = useQueryParam(["name", "typeId", "processorId", "tagId"]);
  const projectId = useProjectIdInUrl();
  return useMemo(
    () => ({
      projectId,
      name: param.name,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
    }),
    [param, projectId]
  );
};

export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];

export const useTaskModal = () => {
  // 得到 editingTaskId 的值，进行初始化数据
  const [{ editingTaskId }, setEditingTaskId] = useQueryParam([
    "editingTaskId",
  ]);
  // 获取到 editingTaskId 对应的 task 信息详情
  const { data: editingTask, isLoading } = useTask(String(editingTaskId));
  const startEdit = useCallback(
    (id: string) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  // 关闭弹窗
  const handleClose = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    visible: Boolean(editingTaskId),
    editingTaskId,
    editingTask,
    isLoading,
    startEdit,
    handleClose,
  };
};
