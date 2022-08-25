import React, { useEffect, useState } from "react";
import { Button, message, Table, Tag, Col, Form, Input, Row, Select } from "antd";
import { getStore, deleteStore } from "../../api/api_store";
import UserUpdateDelete from "../../action/action";
import { useNavigate } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const { Option } = Select;

function FormListStore() {
  let navigate = useNavigate()
  const [data, setData] = useState([]);

  useEffect(() => {
    get()
  }, []);

  // for form search
  // const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const getFields = () => {
    const count = 3;
    const children = [];

    // for (let i = 0; i < count; i++) {
    children.push(
      <Col span={8} >
        <Form.Item
          name={`Tên cửa hàng:`}
          label={`Tên cửa hàng:`}
          rules={[
            {
              required: true,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="placeholder" />
        </Form.Item>

        <Form.Item
          name={`field-1`}
          label={`Field 1`}
          rules={[
            {
              required: true,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="placeholder" />
          <Select defaultValue="2">
            <Option value="1">gì</Option>
            <Option value="2">
              không log
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={`field-1`}
          label={`Field 1`}
          rules={[
            {
              required: true,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="placeholder" />
          <Select defaultValue="2">
            <Option value="1">gì</Option>
            <Option value="2">
              không log
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name={`field-1`}
          label={`Field 1`}
          rules={[
            {
              required: true,
              message: 'Input something!',
            },
          ]}
        >
          <Input placeholder="placeholder" />
          <Select defaultValue="2">
            <Option value="1">gì</Option>
            <Option value="2">
              không log
            </Option>
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

  // ------------------------------------------ get list ------------------------------------------

  //function get list store
  function get() {
    getStore().then((res) => {
      setData(mapDataSource(res?.data?.stores));
    });
  }

  // form list store
  const columns = [
    {
      title: "Tên cửa hàng",
      dataIndex: "storeName",
      key: "storeName",
    },
    {
      title: "Chủ cửa hàng",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Link hỗ trợ",
      dataIndex: "linkSupport",
      key: "linkSupport",
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
    deleteStore(value).then((res) => {
      message.success('Delete success!');
      get()
    }).catch((err) => {
      message.error('Delete failed!');
    });
  };

  function onAddStore() {
    navigate("/dashboard/store/add")
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

      {/* nút thêm mới thông tin */}
      <Button type="primary" onClick={onAddStore}>
        Thêm mới thông tin
      </Button>

      {/* giao diện danh sách cửa hàng */}
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
    <FormListStore />
  </div>
);

export default App;
