import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import FormListUser from './user/service_rd';
import FormListStore from './store/service_rd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Người dùng ', '1', <PieChartOutlined />),
  getItem('Cửa hàng', '2', <DesktopOutlined />),
  getItem('Đơn hàng', '3', <TeamOutlined />),
];

function ListFrom() {

  const [collapsed, setCollapsed] = useState(false);
  //neu khai bao kieu du lieu nhu nay thi can useState, neu can gia tri ban dau thi truyen vao
  //key nhan gia tri 
  //setKey la set gia tri vao
  const [key, setKey] = useState('1');

  //khi key thay doi se thuc hien lai
  //khi co tham so thu 2, thi no se chi thuc hien 1 lan khi vao man
  //
  useEffect(() => {
    generateForm()
  }, [key])

  function onchange(value) {
    setKey(value?.key)
  }

  function generateForm() {
    switch (key) {
      case '2':
        return <FormListStore />
        break;
      case '3':
        // code block
        break;
      default:
        return <FormListUser />
    }
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
        <div className="logo" />
        <Menu onClick={(e) => { onchange(e) }} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >

            {generateForm()}

          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default ListFrom