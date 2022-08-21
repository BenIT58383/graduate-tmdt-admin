
import { DeleteOutlined, FormOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import React from 'react';
import { Button, Dropdown, Menu, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { deleteUser } from "../api/api_user";
import { useNavigate } from 'react-router-dom';


const UserUpdateDelete = (props) => {
  let navigate = useNavigate()
  const menu = (
    <Menu
      style={{ background: '#e5e5e5' }}>
      <Menu.Item key="1" onClick={() => navigate(`/dashboard/user/update/${props?.id}`)} icon={<FormOutlined />}>Sửa user</Menu.Item>
      <Menu.Item key="2" onClick={() => props.handleOnDelete(props.id)} icon={<DeleteOutlined />}>Xoá user</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <span
          className="ant-dropdown-link action-3dot"
          onClick={e => e.preventDefault()}
        >
          <UnorderedListOutlined />
        </span>
      </Dropdown>
    </div>
  )
};









export default UserUpdateDelete;


