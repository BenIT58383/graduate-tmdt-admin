import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from "antd";
import { getDetailStore, updateStore, deleteStore } from '../../api/api_store';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


function UpdateDeleteStore() {
  const [form] = Form.useForm();
  let navigate = useNavigate()

  // navigate("/login")
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      getDetailStore(id).then((res) => {
        form.setFieldsValue(mapDataUpdate(res?.data?.store));
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
      email: from?.status,
    })

  }

  const onFinish = (value) => {
    updateStore(id, value).then((res) => {
      message.success('update success!');
      navigate("/dashboard")

    }).catch((error) => {
      message.error('update failed!');
    })
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        style={{ marginTop: 20 }}
        name="status"
        label="Trạng thái"
        type="number"
        rules={[{ required: false }]}
      >
        <Input placeholder="Nhập trạng thái" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 11, span: 16, }}>
        <Button type="primary" htmlType="submit">
          {"Cập nhật"}
        </Button>
      </Form.Item>

    </Form>
  )
}

export default UpdateDeleteStore