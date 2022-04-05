/*
 * @description: 任务面板搜索
 * @Date: 2022-04-05 15:37:42
 * @Author: xingheng
 */
import React from 'react';
import { useTaskSearchParams } from "screens/panel/utils";
import { useSearchParams } from "react-router-dom";
import { useSetUrlSearchParam } from "hooks/useQueryParam";
import { Col, Input, Row } from "antd";
import { UserSelect } from "components/UserSelect";
import { TaskTypeSelect } from "components/TaskTypeSelect";

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const setSearchParam = useSetUrlSearchParam();
  const reset = () => {
    setSearchParam({
      projectId: undefined,
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId:undefined,
    })
  }
  // const setSearchParams = useSetUrlSearchParams();
  return <Row gutter={10}>
    <Col>
      <Input
        style={{ width: "20rem" }}
        placeholder={'任务名'}
        value={searchParams.name}
        onChange={evt => setSearchParam({name: evt.target.value})}
      />
    </Col>
    <Col>
      <UserSelect
        defaultOptionName={'经办人'}
        value={searchParams.processorId}
        onChange={(value) => setSearchParam({processorId: value})}
        allowClear
      />
    </Col>


    <TaskTypeSelect
      defaultOptionName={'任务类型'}
      value={searchParams.typeId}
      onChange={(value) => setSearchParam({typeId: value})}
      allowClear
    />


  </Row>;
};
