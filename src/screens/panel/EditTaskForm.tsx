/*
 * @description: 编辑任务表单
 * @Date: 2022-12-18 19:29:57
 * @Author: xingheng
 * @LastEditors: xingheng
 * @LastEditTime: 2022-12-18 20:55:44
 */

import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useTaskModal } from "./utils";
import { UserSelect } from "components/UserSelect";
import { TaskTypeSelect } from "components/TaskTypeSelect";
import { useEditTask } from "api/task";

export const EditTaskForm = () => {
  const { editingTask } = useTaskModal();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  const { mutateAsync, isLoading } = useEditTask();
  const { handleClose } = useTaskModal();

  const handleOk = async () => {
    console.log(form.getFieldsValue());
    await mutateAsync({
      ...editingTask,
      ...form.getFieldsValue(),
    });
    handleClose();
  };
  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={handleOk}
      autoComplete="off"
      initialValues={editingTask}
    >
      <Form.Item
        label="任务名称"
        name={"name"}
        rules={[{ required: true, message: "请输入任务名称" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="经办人"
        name={"processorId"}
        rules={[{ required: true, message: "请选择经办人" }]}
      >
        <UserSelect defaultOptionName={"经办人"} />
      </Form.Item>
      <Form.Item
        label="类型"
        name={"typeId"}
        rules={[{ required: true, message: "请选择任务类型" }]}
      >
        <TaskTypeSelect />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button key="back" onClick={handleClose}>
          取消
        </Button>
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={handleOk}
        >
          确定
        </Button>
      </Form.Item>
    </Form>
  );
};
