import { SearchPanel } from "./SearchPanel";
import { List, User } from "./List";
import React, { useEffect, useState } from "react";
import { useMount } from "hooks/useMount";
import { useDebounce } from "hooks/useDebounce";
import { get } from "api/http";
import { Typography } from "antd";
import { useAsync } from "hooks/useAsync";
interface Project {
  id: number;
  personId: number;
  name: string;
  organization: string;
  created: number;
}
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 500);

  const { run, isLoading, error, data: list } = useAsync<Project[]>();

  const { run: runUsers, data: users } = useAsync<User[]>();
  /**
   * @description: 自定义hook 相当于 componentDidMount() 仅在页面加载后第一次加载
   * @param {*}
   * @return {*}
   */
  useMount(() => {
    getUsers();
  });

  /**
   * @description: 输入或者选中的参数改变时，调用函数
   * @param {*}
   * @return {*}
   */
  useEffect(() => {
    getProjects(debounceParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  /**
   * @description: 得到用户
   * @param {*}
   * @return {*}
   */
  const getUsers = async () => {
    runUsers(get<User[]>("/users"));
  };
  /**
   * @description: 得到项目
   * @param {*} param
   * @return {*}
   */
  const getProjects = async (param: any) => {
    run(get<Project[]>("/projects", param));
  };

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </div>
  );
};
