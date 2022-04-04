import { SearchPanel } from "./SearchPanel";
import { List, User } from "./List";
import React, { useCallback, useState } from "react";
import { useMount } from "hooks/useMount";
import { useDebounce } from "hooks/useDebounce";
import { get } from "api/http";
import { useAsync } from "hooks/useAsync";
import useDocumentTitle from "hooks/useDocumentTitle";
import useQueryParam from "hooks/useQueryParam";
import styled from "@emotion/styled";
import { useProject } from "hooks/useProject";
import { ErrorBox } from "components/UI/ErrorBox";
export interface Project {
  id: number;
  personId: number | string;
  name: string;
  organization: string;
  created: number;
  pin?: boolean;
}
export const ProjectListScreen = () => {
  useDocumentTitle("任务管理", false);
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useQueryParam(keys);
  // const [param] = useQueryParam(["name","personId"])

  const debounceParam = useDebounce(param, 500);

  const {
    isLoading,
    error,
    data: list,
  } = useProject(debounceParam);

  const { run: runUsers, data: users } = useAsync<User[]>();

  /**
   * @description: 自定义hook 相当于 componentDidMount() 仅在页面加载后第一次加载
   * @param {*}
   * @return {*}
   */
  useMount(
    useCallback(() => {
      runUsers(get<User[]>("/users"));
    }, [runUsers])
  );

  return (
    <div>
      <TopNav>
        <h1>项目列表</h1>
      </TopNav>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error}/>
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </div>
  );
};
const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
`;
ProjectListScreen.whyDidYouRender = true;
