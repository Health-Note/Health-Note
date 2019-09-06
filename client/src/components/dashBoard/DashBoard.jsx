import React, { useState, useContext } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Routes from '../../Routes';
import Alerts from '../layout/Alerts';
import { AuthContext } from '../../contexts/auth.context';
import { AlertContext } from '../../contexts/alert.context';

const { Header, Content, Footer, Sider } = Layout;

const SiderDemo = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { isAuthenticated, logout, trainer } = authContext;
  const { setAlert } = alertContext;
  
  const [collapsed, setCollapsed] = useState(false); 

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    logout();
    setAlert(`${trainer.nickname}님, 로그아웃 하셨습니다.`, "error")
  }

  const authLinks = (
    <>
      <Icon type="user" />
      <span> {trainer && trainer.nickname} 접속중 </span>
    </>
  );
  
  const logoutLinks = (
    <>
      <Icon type="logout" />
      <span>로그아웃</span>
      <Link onClick={handleLogout}></Link>
    </>
  )

  const guestLinks = (
    <>
      <Icon type="desktop" />
      <span>로그인 / 회원가입</span>
      <Link exact to={"/register"}></Link>
    </>
  );

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} 
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item></Menu.Item>
            <Menu.Item key="1">
              <span>Health Note</span>
              <Link exact to={"/"}></Link>
            </Menu.Item>
            <Menu.Item key="2">
              {isAuthenticated ? authLinks : guestLinks}
            </Menu.Item>
            <Menu.Item key="3">
              {isAuthenticated && logoutLinks}
            </Menu.Item>
            <Menu.Item></Menu.Item>
            <Menu.Item key="9">
              <Icon type="team" />
              <span>회원 관리</span>
              <Link exact to={"/member"}></Link>
            </Menu.Item>
            <Menu.Item key="10">
              <Icon type="calendar"></Icon>
              <span>일정 관리</span>
              <Link exact to={"/schedule"}></Link>
            </Menu.Item>
            <Menu.Item key="11">
              <Icon type="pie-chart" />
              <span>회원 분석</span>
              <Link exact to={"/statistic"}></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Alerts/>
          <Content style={{margin: '24px 16px 0', overflow: 'initial' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}><Routes/></div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }

export default SiderDemo;
