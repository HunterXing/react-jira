/*
 * @description: 处理http的状态和数据
 * @Date: 2021-08-07 13:52:34
 * @LastEditTime: 2022-03-25 11:34:46
 */
import { useState } from "react";
import useMountedRef from "hooks/useMountedRef";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

/**
 * @description: 处理信息和异常
 * @param initialState
 */
export const useAsync = <D>(initialState?: State<D>) => {
  const mounted = useMountedRef();
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise类型数据");
    }
    setState({
      ...state,
      stat: "loading",
    });

    return promise
      .then((data) => {
        if (mounted.current)
          setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
