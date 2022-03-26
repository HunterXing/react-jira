/*
 * @description: 首次加载的自定义hook
 * @Date: 2021-07-25 08:47:00
 * @LastEditTime: 2022-03-25 16:17:19
 */
import { useEffect } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};
