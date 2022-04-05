import { SearchPanel } from "./SearchPanel";
import { List } from "./List";
import React, { useState } from "react";
import { useDebounce } from "hooks/useDebounce";
import useDocumentTitle from "hooks/useDocumentTitle";
import useQueryParam from "hooks/useQueryParam";
import styled from "@emotion/styled";
import { useProjects } from "api/project";
import { ErrorBox } from "components/UI/ErrorBox";
import { useUsers } from "api/user";

export const ProjectListScreen = () => {
  useDocumentTitle("任务管理", false);
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param, setParam] = useQueryParam(keys);
  // const [param] = useQueryParam(["name","personId"])

  const debounceParam = useDebounce(param, 500);

  const { isLoading, error, data: list } = useProjects(debounceParam);

  const { data: users } = useUsers();

  return (
    <div>
      <TopNav>
        <h1>项目列表</h1>
      </TopNav>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </div>
  );
};
const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
`;
ProjectListScreen.whyDidYouRender = true;
