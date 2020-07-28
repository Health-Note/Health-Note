import React, { useState, useContext, useEffect } from 'react';
import { Input, Button, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGIN_REQUEST } from '../../../reducers/types';

function Login(props) {
  const { login, error, clearErrors, isAuthenticated, trainer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && trainer) {
      // 로그인이 되어있으면 홈으로 보냄
      props.history.push('/');

      console.log(trainer, isAuthenticated);
    }
    if (error === '잘못된 정보입니다.') {
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, trainer, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = e => {
    e.preventDefault();
    dispatch({
        type: LOGIN_REQUEST,
        payload: { email, password }
      });
  };

  return (
    <div>
      <Row type="flex" justify="center">
        <Col>
          <h1>로그인</h1>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">이메일</label>
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="이메일"
              required
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="비밀번호"
              required
              onChange={onChange}
            />
          </div>
          <Button
            htmlType="submit"
            type="primary"
            block
            style={{ 'marginTop': '15px' }}
          >
            {' '}
            로그인{' '}
          </Button>
        </form>
      </Row>
    </div>
  );
}

export default withRouter(Login);

