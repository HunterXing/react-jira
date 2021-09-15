/*
 * @description: 处理get传参
 * @Date: 2021-07-24 23:34:58
 * @LastEditTime: 2021-07-25 19:46:05
 */

import qs from "qs";
// 处理参数为空的时候
const resolveParams = (url: string, params: unknown): string => {
  const newParams = resolveParam(params);
  url = url + "?" + qs.stringify(newParams);
  return url;
};

const resolveParam = <P>(params: unknown): P => {
  const object = JSON.parse(JSON.stringify(params));
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      if (element === "") delete object[key];
    }
  }
  return object;
};

export default resolveParams;
