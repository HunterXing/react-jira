import { useLocation } from "react-router";
import { useProject } from "api/project";
import useQueryParam from "hooks/useQueryParam";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/\/projects\/(\d+)/)?.[1];
  return Number(id);
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const usePanelSearchParams = () => ({projectId:useProjectIdInUrl()})

export const usePanelQueryKey = () => ["kanbans", usePanelSearchParams()]

export const useTaskSearchParams = () => {
  const [param, setParams] = useQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()
  return useMemo(() => ({
    projectId,
    name: param.name,
    typeId: Number(param.typeId) || undefined,
    processorId: Number(param.processorId) || undefined,
    tagId: Number(param.tagId) || undefined,
  }), [param, projectId])
}

export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()]
