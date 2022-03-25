/*
 * @description: 返回页面url中，指定键的参数值
 * @Date: 2022-03-06 21:59:11
 * @Author: xingheng
 */

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParam]
    ),
    setSearchParam,
  ] as const;
};

export default useQueryParam;
