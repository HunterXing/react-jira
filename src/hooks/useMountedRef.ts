/*
 * @description: 返回组件的挂载状态
 * @Date: 2022-03-09 22:23:38
 * @Author: xingheng
 */

import React from "react";

const useMountedRef = () => {
  const mountedRef = React.useRef(false);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
export default useMountedRef;
