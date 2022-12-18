/*
 * @description: CreatePanel.tsx
 * @Date: 2022-04-05 22:56:12
 * @Author: xingheng
 */

import React, { useState } from "react";
import { useProjectIdInUrl } from "screens/panel/utils";
import { useAddPanel } from "api/panel";
import { Input } from "antd";
import { ColumnContainer } from "screens/panel/PanelColumn";

export const CreatePanel = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addPanel } = useAddPanel();

  const submit = async () => {
    const { data } = await addPanel({
      name,
      projectId: Number(projectId),
    });
    setName("");
    if (data) {
      window.location.href = `/panel/${data.addPanel.id}`;
    }
  };

  return (
    <ColumnContainer>
      <div>
        <Input
          size={"large"}
          placeholder={"新建看板名称"}
          onPressEnter={submit}
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>
    </ColumnContainer>
  );
};
