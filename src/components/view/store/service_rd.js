import React, { useEffect, useState } from "react";
import { Button, message, Table, Tag, Col, Form, Input, Row, Select, DatePicker, Space } from "antd";
import { getStore, deleteStore } from "../../api/api_store";
import { GetDetailUpdateDeleteUser } from "../../action/action_user";
import { useNavigate } from 'react-router-dom';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import moment from "moment";

const { Option } = Select;

function FormListStore() {
  let navigate = useNavigate()
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    get()
  }, []);

  // for form search
  // const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const getStartDate = (value) => {
    let startDate = value ? moment(value).format('YYYY-MM-DD') : null
    setStartDate(startDate)
  }

  const getEndDate = (value) => {
    let endDate = value ? moment(value).format('YYYY-MM-DD') : null
    setEndDate(endDate)
  }

  const getFields = () => {
    const children = [];

    children.push(
      <Col span={8} >
        <Form.Item
          name={`search`}
          label={`search`}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input allowClear={true} placeholder="Tên / Mô tả/ Chủ Cửa Hàng" />
        </Form.Item>
      </Col>,

      <Col span={7} >
        <Form.Item
          name={`time`}
          label={`Thời gian tạo`}>
          <Space direction="horizontal">
            <DatePicker format={'DD/MM/YYYY'} onChange={getStartDate} />
            ~
            <DatePicker format={'DD/MM/YYYY'} onChange={getEndDate} />
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
            },
          ]}
        >
          <Select allowClear={true} defaultValue={"1"}>
            <Option value="0">Chờ phế duyệt</Option>
            <Option value="1">Hoạt động</Option>
            <Option value="2">Không hoạt động</Option>
          </Select>
        </Form.Item>
      </Col>,
    );

    return children;
  };

  const searchStores = (values) => {
    get(null, null, values?.search, values?.status, startDate, endDate)
    console.log('Received values of form: ', values);
  };

  // ------------------------------------------ get list ------------------------------------------

  //function get list store
  function get(page, size, search, status, startDate, endDate) {
    getStore(page, size, search, status, startDate, endDate).then((res) => {
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
      // phone: item?.phone,
      status: <Tag color={item?.status === 1 ? "green" : (item?.status === 2 ? "red" : "yellow")} key={index}>
        {item?.status === 1 ? "Hoạt động" : (item?.status === 2 ? "Không hoạt động" : "Đang chờ phê duyệt")}
      </Tag>,
      action: (<GetDetailUpdateDeleteUser
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
        onFinish={searchStores}
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
  <div>
    <FormListStore />
  </div>
);

export default App;
