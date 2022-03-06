import { Input, Select } from "antd";
import React, { Fragment } from "react";
import { User } from "./List";
import { css } from "@emotion/react";

const { Option } = Select;

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Fragment>
      <Input
        value={param.name}
        placeholder="项目名"
        style={{ width: "200px", marginRight: "20px" }}
        onChange={(e) => {
          setParam({
            ...param,
            name: e.target.value,
          });
        }}
      />
      <Select
        defaultValue={param.personId}
        value={param.personId}
        style={{ width: 120 }}
        onChange={(value) => {
          setParam({
            ...param,
            personId: value,
          });
        }}
      >
        <Option value={""}>管理员</Option>
        {users.map((user) => {
          return (
            <Option value={user.id} key={user.id}>
              {user.name}
            </Option>
          );
        })}
      </Select>
    </Fragment>
  );
};
