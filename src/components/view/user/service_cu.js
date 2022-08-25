import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal, Menu, Dropdown, Table } from "antd";
import { createUser, getDetaiUser, updateUser } from '../../api/api_user';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


function AddUser() {
  const [form] = Form.useForm();
  let navigate = useNavigate()
  const [data, setData] = useState([]);

  // navigate("/login")
  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) {
      getDetaiUser(id).then((res) => {
        form.setFieldsValue(mapDataUpdate(res?.data?.user));
      }).catch((err) => {
        message.error('Get detail failed!', err);
      })
    }

  }, [id]);

  function mapDataUpdate(from) {
    console.log(from);
    if (Object.keys(from).length === 0) {
      return {};
    }
    return ({
      userName: from?.userName,
      phone: from?.phone,
      email: from?.email,
      name: from?.name,
      dateOfBirth: from?.email,
    })

  }

  const onFinish = (value) => {
    if (!id) {
      createUser(value).then((res) => {
        message.success('add success!');
        navigate("/dashboard")

      }).catch((error) => {
        message.error('add failed!');
      })
    } else {
      updateUser(id, value).then((res) => {
        message.success('update success!');
        navigate("/dashboard")

      }).catch((error) => {
        message.error('update failed!');
      })
    }

  };
  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      // layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    // initialValues={{
    //   requiredMarkValue: 'optional',
    // }}
    >
      <Form.Item
        style={{ padding: '30px 0px 0px 0px' }}
        name="userName"
        label="Nhập tên đăng nhập"
        rules={[{ required: true, }]}
      >
        <Input placeholder="Nhập tên đăng nhập" />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[{ required: true, }]}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Nhập email"
        rules={[{ required: false, }]}
      >
        <Input placeholder="Nhập email" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[{ required: true, }]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>

      <Form.Item
        name="name"
        label="Họ và tên"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
      >
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>

      <Form.Item
        name="dateOfBirth"
        label="Ngày sinh"
        rules={[{ required: false, }]}
      >
        <Input placeholder="Nhập ngày sinh: vd: 02/02/2000" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 11, span: 16, }}>
        <Button type="primary" htmlType="submit">
          {id ? "Cập nhật" : "Tạo mới"}
        </Button>
      </Form.Item>

    </Form>
  )
}

export default AddUser