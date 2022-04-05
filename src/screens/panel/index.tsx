/*
 * @description: 看板
 * @Date: 2022-03-06 21:10:06
 * @Author: xingheng
 */
import React from "react";
import useDocumentTitle from "hooks/useDocumentTitle";
import { usePanels } from "api/Panel";
import { usePanelSearchParams, useProjectInUrl } from "screens/panel/utils";
import { PanelColumn } from "screens/panel/PanelColumn";
import styled from "@emotion/styled";
import { FullLoading } from "components/FullLoading";
import { SearchPanel } from "screens/panel/SearchPanel";

export const Panel = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: panels, isLoading } = usePanels(usePanelSearchParams())
  return <div>
    {
      isLoading ? <FullLoading /> : <>
        <h1>{ currentProject?.name } 看板</h1>
        <SearchPanel />
        <PanelContainter>
          {
            panels?.map(panel => <PanelColumn panel={panel} key={panel.id}/>)
          }
        </PanelContainter>
      </>
    }
  </div>;
};


const PanelContainter = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
