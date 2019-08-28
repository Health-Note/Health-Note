import React, { useState } from 'react';
import { Input, Icon, Button, Row, Col } from 'antd';


function Register() {

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = user;
  
  const onChange = e => setUser({
    ...user, [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    console.log('유저 등록')
  }

  return(
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
              <label htmlFor="name">닉네임</label>
              <Input  
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                name="name"
                value={name}
                placeholder="닉네임"
                onChange={onChange}>
              </Input>
          </div>
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
          <div>
              <label htmlFor="password2">비밀번호 확인</label>
              <Input 
                type="password2"
                name="password2" 
                value={password} 
                placeholder="비밀번호 확인" 
                onChange={onChange}>
              </Input>
          </div>
          <Button type="primary" block style={{"margin-top": "15px"}}> 제출 </Button>
        </form> 
      </Row>
    </div>
  )
}

export default Register;


