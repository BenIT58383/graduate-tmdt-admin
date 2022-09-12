import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal, Menu, Dropdown, Table, Alert } from "antd";
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

  function mapDataUpdate(data) {
    console.log(data);
    if (Object.keys(data).length === 0) {
      return {};
    }
    return ({
      userName: data?.userName,
      phone: data?.phone,
      email: data?.email,
      name: data?.name,
      dateOfBirth: data?.dateOfBirth,
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
    <>
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
          rules={[{ required: (id ? false : true) }]}
        >
          <Input placeholder="Nhập tên đăng nhập" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: (id ? false : true) }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Nhập email"
          rules={[{ required: (id ? false : true) }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: (id ? false : true) }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Họ và tên"
          rules={[{ required: (id ? false : true), message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          name="dateOfBirth"
          label="Ngày sinh"
          rules={[{ required: (id ? false : true) }]}
        >
          <Input placeholder="Nhập ngày sinh: vd: 02/02/2000" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 11, span: 16, }}>
          <Button type="primary" htmlType="submit">
            {id ? "Cập nhật" : "Tạo mới"}
          </Button>
        </Form.Item>

      </Form>

    </>

  )
}

export default AddUser