/*
 * @description: 新增/编辑 项目弹窗
 * @Date: 2022-03-26 19:59:11
 * @Author: xingheng
 */
import React, { useEffect } from "react";
import useProjectModel from "hooks/useProjectModel";
import {
  Button,
  Drawer,
  DrawerProps,
  Form,
  FormInstance,
  Input,
  message,
  Select,
  Spin,
} from "antd";
import { useUsers } from "api/user";
import { useAddProject, useEditProject } from "api/project";
import { ErrorBox } from "components/UI/ErrorBox";
import { Project } from "types/Project";

export interface ModelProps extends DrawerProps {}

export const ProjectModel = () => {
  const {
    projectModelOpen,
    close,
    projectModelIsEdit,
    projectDetail,
    isLoading,
  } = useProjectModel();
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      ...projectDetail,
      personId: String(projectDetail?.personId || ""),
    });
  }, [form, projectDetail]);
  return (
    <Drawer
      title={!projectModelIsEdit ? "新增项目" : "编辑项目"}
      onClose={close}
      visible={projectModelOpen}
      width={"100%"}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <ProjectForm
          project={projectDetail}
          projectModelIsEdit={projectModelIsEdit}
          form={form}
          close={close}
        />
      )}
    </Drawer>
  );
};

const ProjectForm = ({
  project,
  projectModelIsEdit,
  form,
  close,
}: {
  project: Project | undefined;
  projectModelIsEdit: Boolean;
  form: FormInstance<any>;
  close: () => void;
}) => {
  const { data: users } = useUsers();
  const useAddOrEditProject = projectModelIsEdit
    ? useEditProject
    : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useAddOrEditProject();

  const onFinish = (values: any) => {
    mutateAsync({ ...project, ...values }).then(() => {
      if (!projectModelIsEdit) {
        form.resetFields();
      }
      message.success(projectModelIsEdit ? "编辑项目成功" : "添加项目成功");
      close();
    });
  };
  return (
    <>
      <ErrorBox error={error} />
      <Form
        form={form}
        layout={"vertical"}
        style={{ width: "40rem" }}
        onFinish={onFinish}
      >
        <Form.Item
          label={"名称"}
          name={"name"}
          rules={[{ required: true, message: "请输入项目名称" }]}
        >
          <Input placeholder={"请输入项目名称"} />
        </Form.Item>
        <Form.Item
          label={"部门"}
          name={"organization"}
          rules={[{ required: true, message: "请输入部门名称" }]}
        >
          <Input placeholder={"请输入部门名称"} />
        </Form.Item>
        <Form.Item label={"负责人"} name={"personId"}>
          <Select defaultValue={""}>
            <Select.Option value={""} key={0}>
              全部
            </Select.Option>
            {users?.map((user) => {
              return (
                <Select.Option value={`${user?.id}`} key={user?.id}>
                  {user?.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button loading={mutateLoading} type={"primary"} htmlType={"submit"}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
