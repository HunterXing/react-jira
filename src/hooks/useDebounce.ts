/*
 * @description: debounce
 * @Date: 2021-07-25 11:13:02
 * @LastEditTime: 2021-07-25 19:37:54
 */
import { useState, useEffect } from "react";
// import { debounce } from "lodash";

export const useDebounce = <S>(param: S, delay?: number): S => {
  const [debounceState, setDebounceState] = useState(param);
  // setDebounceState(param)
  useEffect(() => {
    // debounce(() => setDebounceState(param), delay);
    const timer = setTimeout(() => setDebounceState(param), delay);
    return () => clearTimeout(timer);
  }, [param, delay]);
  return debounceState;
};
