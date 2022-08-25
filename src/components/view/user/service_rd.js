import React, { useEffect, useState } from "react";
import { Button, message, Table, Tag, Col, Form, Input, Row, Select, Space, DatePicker } from "antd";
import { getUser, deleteUser } from "../../api/api_user";
import UserUpdateDelete from "../../action/action";
import { useNavigate } from 'react-router-dom';
import { Option } from "antd/lib/mentions";

function FormListUser() {
  let navigate = useNavigate()
  const [data, setData] = useState([]);
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    get()
  }, []);

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children = [];

    // for (let i = 0; i < count; i++) {
    children.push(
      <Col span={8} >
        <Form.Item
          name={`name_phone_email`}
          label={`search`}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="Tên / Số điện thoại / Email" />
        </Form.Item>
      </Col>,

      <Col span={7} >
        <Form.Item
          name={`start_end_date`}
          label={`Thời gian tạo`}>
          <Space direction="horizontal">
            <DatePicker format={'DD/MM/YYYY'} onChange={onChange} />
            ~
            <DatePicker format={'DD/MM/YYYY'} onChange={onChange} />
          </Space>
        </Form.Item>
      </Col>,

      <Col span={8}>
        <Form.Item
          name={`status`}
          label={`Trạng thái`}
          rules={[
            {
              required: false,
              message: 'Input something!',
            },
          ]}
        >
          <Select defaultValue="1">
            <Option value="1">Hoạt động</Option>
            <Option value="2">Không hoạt động</Option>
          </Select>
        </Form.Item>
      </Col>,
    );
    // }

    return children;
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

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
      {/* form search */}
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>

      {/* ---------------------hiển thị------------------------- */}
      <Button type="primary" onClick={onAddUser}>
        Thêm mới thông tin
      </Button>

      <Table columns={columns} dataSource={data} />
    </>
  );
}

const App = () => (
  // <div>
  //   <AdvancedSearchForm />
  //   <div className="search-result-list">Search Result List</div>
  // </div>

  <div>
    <FormListUser />
  </div>
);

export default App;
