import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { UserAddOutlined, UserOutlined, LogoutOutlined, TeamOutlined, CalendarOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Routes from '../routing/Routes';
import Alerts from '../context/atoms/Alerts';
import { AuthContext } from '../../contexts/auth.context';
import { AlertContext } from '../../contexts/alert.context';
import { MembersContext } from '../../contexts/members.context';
import { ScheduleContext } from '../../contexts/schedule.context';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  // context
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const scheduleContext = useContext(ScheduleContext);
  const membersContext = useContext(MembersContext);
  const { isAuthenticated, logout, trainer } = authContext;
  const { setAlert } = alertContext;

  // state
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    authContext.loadUser();
    membersContext.getMember();
    // eslint-disable-next-line
  }, []);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleLogout = () => {
    logout();
    setAlert(
      `${trainer.trainerName}님, 로그아웃 하셨습니다.`,
      'success',
      trainer.trainerName
    );
  };

  const authLinks = (
    <>
      <UserOutlined />
      <span> {trainer && trainer.trainerName} 접속중 </span>
    </>
  );

  const logoutLinks = (
    <>
      <LogoutOutlined />
      <span>로그아웃</span>
      <Link to={'/login'} onClick={handleLogout}></Link>
    </>
  );

  const guestLoginLinks = (
    <>
      <UserOutlined />
      <span>로그인</span>
      <Link to={'/login'}></Link>
    </>
  );

  const guestRegisterLinks = (
    <>
      <UserAddOutlined />
      <span> 회원가입</span>
      <Link to={'/register'}></Link>
    </>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item></Menu.Item>
          <Menu.Item key="1">
            <span>Health Note</span>
            <Link to={'/'}></Link>
          </Menu.Item>
          <Menu.Item key="2">
            {isAuthenticated && trainer ? authLinks : guestLoginLinks}
          </Menu.Item>
          <Menu.Item key="3">
            {isAuthenticated && trainer ? logoutLinks : guestRegisterLinks}
          </Menu.Item>
          <Menu.Item></Menu.Item>
          <Menu.Item key="9">
            <TeamOutlined />
            <span>회원 관리</span>
            <Link to={'/member'}></Link>
          </Menu.Item>
          <Menu.Item key="10">
            <CalendarOutlined />
            <span>일정 관리</span>
            <Link to={'/schedule'}></Link>
          </Menu.Item>
          <Menu.Item key="11">
            <PieChartOutlined />
            <span>회원 분석</span>
            <Link to={'/statistic'}></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Alerts />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item></Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Routes />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
