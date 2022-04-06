/*
 * @description: 看板列组件
 * @Date: 2022-04-05 14:13:12
 * @Author: xingheng
 */
import React from "react";
import { Panel } from "types/Panel";
import { useTasks, useTaskType } from "api/Task";
import taskSvg from "assets/images/task.svg";
import bugSvg from "assets/images/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { useTaskSearchParams } from "screens/panel/utils";
import { FullLoading } from "components/FullLoading";
import { CreateTask } from "screens/panel/CreateTask";

export const PanelColumn = ({ panel }: {panel: Panel}) => {
  const { data: allTasks, isLoading } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter(task => task.kanbanId === panel.id);
  return (
    <ColumnContainer>
      <h3>{panel.name}</h3>
      <TaskContainter>
        {
          isLoading ? <FullLoading height={"50vh"} size={"small"}/> :
          tasks?.map(task => (
            <Card style={{marginBottom: '0.5rem'}} key={task.id}>
              <div>
                {task.name}
              </div>
              <TaskIcon id={task.typeId} />
            </Card>
          ))
        }
        <CreateTask kanbanId={panel.id}/>
      </TaskContainter>
    </ColumnContainer>
  );
};


const TaskIcon = ({ id } : { id:number }) => {
  const { data: taskIcons } = useTaskType();
  const taskIcon = taskIcons?.find(taskIcon => taskIcon.id === id)?.name;
  if(!taskIcon) {
    return null;
  }
  return (
      <img src={taskIcon === 'task' ? taskSvg : bugSvg } alt=""/>
  );
}

export const ColumnContainer = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainter = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
