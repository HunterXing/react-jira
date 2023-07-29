/*
 * @description: 任务组接口
 * @Date: 2022-12-19 22:14:47
 * @Author: xingheng
 * @LastEditors: xingheng
 * @LastEditTime: 2022-12-19 22:15:28
 */

import { useHttp } from "api/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Panel } from "types/Panel";

export const usePanels = (params?: Partial<Panel>) => {
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
