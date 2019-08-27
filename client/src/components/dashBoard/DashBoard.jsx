import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Routes from '../../Routes';

const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item></Menu.Item>
            <Menu.Item key="1">
              <span>Health Note</span>
              <Link exact to={"/schedule"}>{"Schedule"}</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>로그인 / 회원가입</span>
              <Link exact to={"/Statistic"}>{"Statistics"}</Link>
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
              <Link exact to={"/Statistic"}></Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
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
}

export default SiderDemo;