import React, { useState, useContext, useEffect } from 'react';
import { Input, Button, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../../contexts/auth.context';
import { AlertContext } from '../../../contexts/alert.context';

function Login(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated, trainer } = authContext;

  useEffect(() => {
    if (isAuthenticated && trainer) {
      // 로그인이 되어있으면 홈으로 보냄
      props.history.push('/');
      setAlert(
        `안녕하세요, ${trainer.nickname}님! 헬스노트에 로그인 하셨습니다.`,
        'success'
      );
      console.log(trainer, isAuthenticated);
    }
    if (error === '잘못된 정보입니다.') {
      setAlert(error, 'error');
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
    if (email === '' || password === '') {
      setAlert('모든 항목을 채우세요', 'danger');
    } else {
      login({ email, password });
    }
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
            style={{ 'margin-top': '15px' }}
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
