import React from "react";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
interface ListProps extends TableProps<any> {
  // list: Project[];
  users: User[];
}

// interface Project {
//   id: number;
//   personId: number;
//   name: string;
//   organization: string;
//   created: number;
// }

export interface User {
  name: string;
  id: number;
  token: string;
}

// type PropsType = Omit<ListProps, 'users'>

export const List = ({ users, ...props }: ListProps) => {
  const columns = [
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
  ];
  return <Table {...props} columns={columns} rowKey="id" />;
};
