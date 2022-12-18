/*
 * @description: CreateTask.tsx
 * @Date: 2022-04-06 21:15:15
 * @Author: xingheng
 */
import React, { useEffect, useState } from "react";
import { useAddTask } from "api/task";
import { useProjectIdInUrl } from "screens/panel/utils";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const { mutateAsync: addTask } = useAddTask();
  const projectId = useProjectIdInUrl();
  const [inputModel, setInputModel] = useState(false);

  const submit = async () => {
    await addTask({
      name,
      projectId,
      kanbanId,
    });
    setName("");
    setInputModel(false);
  };

  const toggle = () => setInputModel(!inputModel);

  useEffect(() => {
    if (!inputModel) {
      setName("");
    }
  }, [inputModel]);
  if (!inputModel) {
    return <div onClick={() => toggle()}>+创建事务</div>;
  }
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做什么"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  );
};
