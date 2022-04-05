/*
 * @description: 看板相关请求hooks
 * @Date: 2022-04-05 13:55:47
 * @Author: xingheng
 */

import { useHttp } from "api/api";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { Panel } from "types/Panel";
import { Project } from "types/Project";

export const usePanels = (params? : Partial<Panel>) => {
  const client = useHttp();
  return useQuery<Panel[]>(["kanbans", params], () =>
    client("kanbans", {
      method: "GET",
      data: params,
    })
  );
};

/**
 * @description: 新增看板
 */
export const useAddPanel = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Panel>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("kanbans"),
    }
  );
};
