import React, { useState, useContext, useEffect } from 'react';
import { Input, Button, Row, Col, Checkbox } from 'antd';
import { UserAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { showConfirm } from '../../../components/context/atoms/ComfirmModal';
import { AlertContext } from '../../../contexts/alert.context';
import { AuthContext } from '../../../contexts/auth.context';
import useToggle from '../../../hooks/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_REQUEST } from '../../../reducers/types';

function Register(props) {
  const { register, error, clearErrors, isAuthenticated, trainer } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isAuthenticated) {
      // 로그인이 되어있으면 홈으로 보냄
      props.history.push('/');
    }
    if (error) {
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);
  
  const [agreement, toggle] = useToggle();
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useState({
    trainerName: '',
    email: '',
    password: '',
    password2: '',
    agreementId: 1
  });

  const { trainerName, email, password, password2 } = user;

  const onChange = e => {
    setUser({
        ...user,
        [e.target.name]: e.target.value,
      },
    );
    // 패스워드 양방향 체크
   setPasswordError(
     user.password !== e.target.value && e.target.name === 'password2' ||
     user.password2 !== e.target.value && e.target.name ==='password')
  };

  const onSubmit = e => {
    e.preventDefault();
    if (trainerName === '' || email === '' || password === '') {
    } else if (password !== password2) {
      alert('패스워드가 일치하지 않습니다.');
    } else if (!agreement) {
      alert('약관에 동의하세요');
    } else {
      dispatch({
        type: REGISTER_REQUEST,
        payload: {
          trainerName, email, password, 'agreementId': 1,
        },
      });
    }
  };

  return (
    <div>
      <Row type="flex" justify="center">
        <Col>
          <h1>
            계정 <span>등록</span>
          </h1>
        </Col>
      </Row>
      <Row type="flex" justify="center">
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="trainerName">트레이너 이름</label>
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              name="trainerName"
              value={trainerName}
              placeholder="트레이너 이름"
              required
              onChange={onChange}
            />
          </div>
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
              minLength={6}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="password2">비밀번호 확인</label>
            <Input
              type="password"
              name="password2"
              value={password2}
              placeholder="비밀번호 확인"
              required
              minLength={6}
              onChange={onChange}
            />
          </div>
          {passwordError && <div>패스워드가 일치하지 않습니다</div>}
          <Row type="flex" justify="end" style={{marginTop: "10px"}}>
            <Col>
              <Checkbox value={agreement} onChange={toggle}> </Checkbox>
              <Button  onClick={()=> showConfirm({title: "hello", content: "동의하시죠?"})} > 회원약관보기 </Button>
            </Col>
          </Row>
          <Button
            htmlType="submit"
            type="primary"
            block
            style={{ marginTop: '15px' }}
          >
            가입
          </Button>
        </form>
      </Row>
    </div>
  );
}

export default withRouter(Register);
