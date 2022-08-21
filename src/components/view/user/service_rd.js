import React, { useEffect, useState } from "react";
import { Button, message, Table, Tag } from "antd";
import { getUser, deleteUser } from "../../api/api_user";
import UserUpdateDelete from "../../action/action";
import { useNavigate } from 'react-router-dom';

function FormListUser() {
  let navigate = useNavigate()
  const [data, setData] = useState([]);

  useEffect(() => {
    get()
  }, []);

  function get() {
    getUser().then((res) => {
      setData(mapDataSource(res?.data?.users));
    });
  }

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "",
      dataIndex: "action",
    },
  ];

  const mapDataSource = (values) => {
    return values.map((item, index) => ({
      ...item,
      phone: item?.phone,
      status: <Tag color={item.status === 1 ? "green" : "red"} key={index}>
        {item.status === 1 ? "Hoạt động" : "Không hoạt động"}
      </Tag>,
      action: (<UserUpdateDelete
        handleOnDelete={handleOnDelete}
        id={item?.id}
      />),

    }))
  }

  const handleOnDelete = (value) => {
    deleteUser(value).then((res) => {
      message.success('Delete success!');
      get()
    }).catch((err) => {
      message.error('Delete failed!');
    });
  };

  function onAddUser() {
    navigate("/dashboard/user/add")
  }

  return (
    <>
      <Button type="primary" onClick={onAddUser}>
        Thêm mới thông tin
      </Button>

      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default FormListUser;
