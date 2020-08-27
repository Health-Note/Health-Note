import React from 'react';
import { Button, Col, InputNumber, Row } from 'antd';

const RowHeader = () => {
  return (
    <Row justify="start" align="middle"
         style={{ padding: 10, borderBottom: '1px solid lightgrey' }}
    >
      <Col xs={3} md={3}>부위</Col>
      <Col xs={9} md={9}>운동</Col>
      <Col xs={3} md={3}>세트</Col>
      <Col xs={3} md={3}>반복</Col>
      <Col offset={3} xs={3} md={3}>삭제</Col>
    </Row>
  )
}

export default RowHeader;
