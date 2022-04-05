/*
 * @description: 返回页面url中，指定键的参数值
 * @Date: 2022-03-06 21:59:11
 * @Author: xingheng
 */

import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

const useQueryParam = <K extends string>(keys: K[]) => {
  // react-router-dom 中的 useSearchParams
  const [searchParam, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return {
            ...prev,
            [key]: searchParam.get(key) || "",
          };
        }, {} as { [key in K]: string }),
      [searchParam, keys]
    ),
    setSearchParam,
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = {
      ...Object.fromEntries(searchParams),
      ...params,
    } as URLSearchParamsInit;
    return setSearchParam(o);
  };
};

export default useQueryParam;
