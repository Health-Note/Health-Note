import React, { useState } from 'react';
import { Input, Icon, Button, Row, Col } from 'antd';


function Login() {

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const { email, password } = user;
  
  const onChange = e => setUser({
    ...user, [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    console.log('유저 로그인')
  }

  return(
    <div>
      <Row type="flex" justify="center">
        <Col>
          <h1>
              로그인
          </h1>
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
                onChange={onChange}></Input>
          </div>
          <div>
            <label htmlFor="password">비밀번호</label>
            <Input 
              type="password"
              name="password" 
              value={password} 
              placeholder="비밀번호" 
              onChange={onChange}></Input>
          </div>
          <Button type="primary" block style={{"margin-top": "15px"}}> 로그인 </Button>
        </form> 
      </Row>
    </div>
  )
}

export default Login;


