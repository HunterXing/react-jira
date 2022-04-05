/*
 * @description: 选择用户下拉
 * @Date: 2022-04-05 16:00:06
 * @Author: xingheng
 */
import React from "react";
import { IdSelect } from "components/IdSelect";
import { useUsers } from "api/user";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
