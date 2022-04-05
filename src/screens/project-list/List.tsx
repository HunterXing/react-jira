import React from "react";
import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Star from "components/Star";
import useProjectModel from "hooks/useProjectModel";
import { useEditProject } from "api/project";
import { User } from "types/User";

interface ListProps extends TableProps<any> {
  users: User[];
}

// type PropsType = Omit<ListProps, 'users'>

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const { open, setProjectEditId } = useProjectModel();
  // 函数柯里化
  // const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  const handleOpenEditModel = (id: string) => {
    open();
    setProjectEditId({
      projectEditId: id,
    });
  };
  const columns = [
    {
      title: <Star isStar={true} disabled={true} />,
      render: (name: string, project: any) => {
        return (
          <Star
            isStar={project.pin}
            onCheckedChange={() => {
              mutate({ ...project, pin: !project.pin });
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
                <Menu.Item key={1}>
                  <Button
                    type="text"
                    style={{ padding: 0 }}
                    onClick={() => handleOpenEditModel(String(project.id))}
                  >
                    编辑项目
                  </Button>
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
