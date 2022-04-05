/*
 * @description: 看板相关请求hooks
 * @Date: 2022-04-05 13:55:47
 * @Author: xingheng
 */

import { useHttp } from "api/api";
import { useQuery } from "react-query";
import { Panel } from "types/Panel";

export const usePanels = (params? : Partial<Panel>) => {
  const client = useHttp();
  return useQuery<Panel[]>(["kanbans", params], () =>
    client("kanbans", {
      method: "GET",
      data: params,
    })
  );
};
