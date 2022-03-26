/*
 * @description: 处理http的状态和数据
 * @Date: 2021-08-07 13:52:34
 * @LastEditTime: 2022-03-25 15:55:23
 */
import { useCallback, useState } from "react";
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

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        stat: "error",
        data: null,
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<D>) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise类型数据");
      }
      setState((preState) => ({
        ...preState,
        stat: "loading",
      }));

      return promise
        .then((data) => {
          if (mounted.current) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
        });
    },
    [mounted, setData, setError]
  );

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
