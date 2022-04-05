/*
 * @description: 看板
 * @Date: 2022-03-06 21:10:06
 * @Author: xingheng
 */
import React, { Fragment } from "react";
import useDocumentTitle from "hooks/useDocumentTitle";
import { usePanels } from "api/Panel";
import { usePanelSearchParams, useProjectInUrl } from "screens/panel/utils";
import { PanelColumn } from "screens/panel/PanelColumn";
import styled from "@emotion/styled";
import { FullLoading } from "components/FullLoading";
import { SearchPanel } from "screens/panel/SearchPanel";
import { Empty } from "antd";
import { NoData } from "components/NoData";

export const Panel = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: panels, isLoading } = usePanels(usePanelSearchParams());
  return (
    <Fragment>
      {isLoading ? (
        <FullLoading />
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', flex: 1 }}>
          <TopSearchWrap>
            <h1>{currentProject?.name} 看板</h1>
            <SearchPanel />
          </TopSearchWrap>

          <PanelContainter>
            {panels?.length ? (
              panels?.map((panel) => (
                <PanelColumn panel={panel} key={panel.id} />
              ))
            ) : (
              <NoData description={"该项目暂无任务"} />
            )}
          </PanelContainter>
        </div>
      )}
    </Fragment>
  );
};

const PanelContainter = styled.div`
  display: flex;
  flex: 1;
  margin-top: 2rem;
  margin-right: 2rem;
  overflow-x: auto;
`;

const TopSearchWrap = styled.div`
  height: 9rem;
`;
