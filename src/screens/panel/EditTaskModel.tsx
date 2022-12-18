/*
 * @description: 编辑任务
 * @Date: 2022-04-06 22:01:18
 * @Author: xingheng
 */
import React from "react";
import { Modal } from "antd";
import { useTaskModal } from "./utils";
import { EditTaskForm } from "./EditTaskForm";

export const EditTask = () => {
  const { visible, handleClose } = useTaskModal();
  return (
    <Modal
      title="编辑任务"
      visible={visible}
      onCancel={handleClose}
      forceRender={true}
      footer={null}
    >
      <EditTaskForm />
    </Modal>
  );
};
