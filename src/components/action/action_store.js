
import { DeleteOutlined, FormOutlined, InfoCircleOutlined, InfoOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import { Button, Dropdown, Menu, message } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { deleteStore } from "../api/api_store";
import { useNavigate } from 'react-router-dom';

//handle update and delete user
const GetDetailUpdateDeleteStore = (props) => {
  let navigate = useNavigate()
  const menu = (
    <Menu
      style={{ background: '#e5e5e5' }}>
      <Menu.Item key="1" onClick={() => props.getDetail(props.id, true)} icon={<InfoCircleOutlined />}>Chi tiết</Menu.Item>
      <Menu.Item key="2" onClick={() => navigate(`/dashboard/store/update/${props?.id}`)} icon={<FormOutlined />}>Chỉnh sửa</Menu.Item>
      <Menu.Item key="3" onClick={() => props.handleOnDelete(props.id)} icon={<DeleteOutlined />}>Xoá</Menu.Item>
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

export {
  GetDetailUpdateDeleteStore,
};


