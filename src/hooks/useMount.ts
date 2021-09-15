/*
 * @description: 首次加载的自定义hook
 * @Date: 2021-07-25 08:47:00
 * @LastEditTime: 2021-08-01 22:13:20
 */
import { useEffect } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
