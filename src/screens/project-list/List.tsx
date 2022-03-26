import React from "react";
import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Star from "components/UI/Star";
import { useEditProject } from "api/project";
import { Project } from "screens/project-list/index";
interface ListProps extends TableProps<any> {
  users: User[];
  setList: (projects: Project[]) => void;
  modelVisibility: boolean;
  setModelVisibility: (visible: boolean) => void;
}

export interface User {
  name: string;
  id: number;
  token: string;
}

// type PropsType = Omit<ListProps, 'users'>

export const List = ({
  users,
  modelVisibility,
  setModelVisibility,
  ...props
}: ListProps) => {
  const { mutate } = useEditProject();
  // 函数柯里化
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const columns = [
    {
      title: <Star isStar={true} disabled={true} />,
      render: (name: string, project: any) => {
        return (
          <Star
            isStar={project.pin}
            onCheckedChange={() => {
              pinProject(project);
            }}
          />
        );
      },
      width: 50,
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render: (name: string, project: any) => {
        return <Link to={String(project.id)}>{name}</Link>;
      },
    },
    {
      title: "负责人",
      dataIndex: "personId",
      key: "personId",
      render: (personId: number) => {
        return (
          <span key={personId}>
            {users.find((user) => user.id === personId)?.name || "未知"}
          </span>
        );
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
      key: "organization",
    },
    {
      title: "创建时间",
      dataIndex: "created",
      key: "created",
      render: (created: number) => {
        return <span>{dayjs(created).format("YYYY-MM-DD")}</span>;
      },
    },
    {
      title: "操作",
      render: (value: number, project: any) => {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => setModelVisibility(true)}>
                  修改项目
                </Menu.Item>
              </Menu>
            }
            placement="bottomLeft"
            arrow
          >
            <Button type="link" style={{ padding: 0 }}>
              ...
            </Button>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <Table
      {...props}
      columns={columns}
      rowKey="id"
      style={{ marginTop: "10px" }}
    />
  );
};
