/*
 * @description: useDocumentTitle.ts
 * @Date: 2022-03-06 20:17:35
 * @Author: xingheng
 */
import { useEffect } from "react";

const useDocumentTitle = (title: string, keepOnUnMount = true) => {
  let oldTitle = document.title;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUnMount) {
        document.title = oldTitle;
      }
    };
  }, []);
};

export default useDocumentTitle;
