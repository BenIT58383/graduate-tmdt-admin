import React, { useEffect, useState } from "react";
import { Button, message, Table, Tag, Col, Form, Input, Row, Select, Space, DatePicker, Modal, Descriptions, Alert } from "antd";
import { getUser, deleteUser, getDetaiUser } from "../../api/api_user";
import { GetDetailUpdateDeleteUser } from "../../action/action_user";
import { useNavigate } from 'react-router-dom';
import { Option } from "antd/lib/mentions";
import moment from "moment";

function FormListUser() {
  let navigate = useNavigate()
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);

  useEffect(() => {
    get(null, null, null, null)
  }, []);

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
          <Input allowClear={true} placeholder="Tên / Số điện thoại / Email" />
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
              message: 'Input something!',
            },
          ]}
        >
          <Select allowClear={true} defaultValue={"1"}>
            <Option value="1">Hoạt động</Option>
            <Option value="0">Không hoạt động</Option>
          </Select>
        </Form.Item>
      </Col>,
    );

    return children;
  };


  const searchUser = (values) => {
    get(null, null, values?.search, values?.status, startDate, endDate)
    console.log('Received values of form: ', values);
  };

  function get(page, size, search, status, startDate, endDate) {
    getUser(page, size, search, status, startDate, endDate).then((res) => {
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


  const formDetail = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
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
      title: "Tên cửa hàng",
      dataIndex: "storeName",
      key: "storeName",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
  ];

  const mapDataSource = (values) => {
    return values.map((item, index) => ({
      ...item,
      phone: item?.phone,
      status: <Tag color={item.status === 1 ? "green" : "red"} key={index}>
        {item.status === 1 ? "Hoạt động" : "Không hoạt động"}
      </Tag>,
      action: (<GetDetailUpdateDeleteUser
        handleOnDelete={handleOnDelete}
        getDetail={getDetail}
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


  const getDetail = (id, value) => {

    getDetaiUser(id).then((res) => {
      setIsModalOpen(value)
      let result = res?.data?.user
      if (result) {
        if (result.status) {
          result.status = result.status = 1 ? 'Hoạt động' : 'Không hoạt động'
          result.role = result.role = 1 ? 'Khách hàng' : (result.role = 2 ? 'Chủ cửa hàng' : 'Admin')
        }
      }
      setDataDetail(result)
    }).catch((err) => {
      message.error('get detail failed!');
    });
  };

  function onAddUser() {
    navigate("/dashboard/user/add")
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getItems = (values) => {
    return values.map((value) => getItem(value))
  }

  const getItem = (column) => {
    return <Descriptions.Item
      labelStyle={column.labelStyle ? column.labelStyle : false} key={column.dataIndex}
      label={column.title}
      contentStyle={column.contentStyle ? column.contentStyle : false}
    >
      {dataDetail[0] ? dataDetail[0][column.dataIndex] : dataDetail[column.dataIndex]}
    </Descriptions.Item>
  }

  return (
    <>

      {/* form search */}
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={searchUser}
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

      <Modal title="Thông tin chi tiết"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={true}
        destroyOnClose={true}
        width={750}>
        <Descriptions
          column={2}
          contentStyle={{ marginRight: '50px' }}
          columns={formDetail}
          dataSource={dataDetail}
        >
          {getItems(formDetail)}
        </Descriptions>
      </Modal>
    </>
  );
}

const App = () => {

  return (<div>
    <FormListUser />

  </div>)

}

export default App;
