import React from 'react';
import { Button, Col, InputNumber, Row } from 'antd';

const RowHeader = () => {
  return (
    <Row justify="start" align="middle"
         style={{ padding: 10, borderBottom: '1px solid lightgrey' }}
    >
      <Col md={3}>부위</Col>
      <Col md={9}>운동이름</Col>
      <Col md={3}>세트수</Col>
      <Col md={3}>반복수</Col>
      <Col offset={3} md={3}>삭제</Col>
    </Row>
  )
}

export default RowHeader;
