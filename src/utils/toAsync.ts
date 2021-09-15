/*
 * @description: 优雅处理 async await 的 错误
 * @Date: 2021-07-28 16:22:15
 * @LastEditTime: 2021-08-07 14:52:37
 */
const to = <D>(promise: Promise<D>) => {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err]);
};
export default to;
