import React from 'react'
import "../../App.css";
import { Button, Form, Input, Select, Checkbox, message } from "antd";
import loginImg from "../../../src/login.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { login } from '../api/api_user';

function LoginFrom() {

  const [form] = Form.useForm();
  let navigate = useNavigate()

  const onFinish = (values) => {
    login(values)
      .then((response) => {
        console.log(4444444, response?.data?.token);
        localStorage.clear()
        localStorage.setItem('Token', JSON.stringify(response?.data?.token));
        navigate("/dashboard")
      })
      .catch((err) => { message.info('Sai tài khoản mật khẩu vui lòng xem lại !'); })
  };

  return (
    <div className="lContainer">
      <div className="lItem">
        <div className="loginImage">
          <img
            src={loginImg}
            width="300"
            style={{ position: "relative" }}
            alt="login"
          />
        </div>
        <div className="loginForm">
          <h2>Login</h2>
          <Form
            name="nest-messages"
            onFinish={onFinish}
            layout="vertical"
            scrollToFirstError
            className="login-form"
          >
            <Form.Item
              name={["userNamePhone"]}
              rules={[
                {
                  required: true,
                  message: "Vui làm nhập tên đăng nhập / số điện thoại",
                },
              ]}
            >
              <Input placeholder="Tên đăng nhập/số điện thoại" prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name={["password"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input type="password" placeholder="Password" prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
              <Button
                type="primary"
                htmlType="submit"
                className="margin-lr-10 width-80"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginFrom