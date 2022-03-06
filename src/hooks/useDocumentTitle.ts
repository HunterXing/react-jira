/*
 * @description: useDocumentTitle.ts
 * @Date: 2022-03-06 20:17:35
 * @Author: xingheng
 */
import { useEffect, useRef } from "react";

const useDocumentTitle = (title: string, keepOnUnMount = true) => {
  let oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnMount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnMount, oldTitle]);
};

export default useDocumentTitle;
