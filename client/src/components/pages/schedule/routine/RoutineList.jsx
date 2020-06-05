import React, { useState } from 'react';
import { Card, Col, Button, InputNumber, Row, Tag, Table, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';

const { Meta } = Card;
const RoutineList = ({ routine, insertCounts, getDelExerCode }) => {

  const [count, setCount] = useState(0);
  const [repetition, setRepetition] = useState(0);

  const onChangeCount = value => {
    setCount(value);
    insertCounts(routine.uuid, count, repetition);
  };

  const onChangeRepetition = value => {
    setRepetition(value);
    insertCounts(routine.uuid, count, repetition);
  };

  const onClickDeleteButton = () => {
    getDelExerCode(routine.exerciseCode);
  };

  return (
    <Row justify="start" align="middle"
         style={{ width: 500, height: 55, margin: 13, padding: 0, border: '1px solid lightgrey' }}>
      <Col md={3}><Tag>{routine.targetName}</Tag></Col>
      <Col md={8}>{routine.exerciseName}</Col>
      <Col md={3}><InputNumber onChange={onChangeRepetition} style={{ width: 55 }}/></Col>
      <Col md={3}><InputNumber onChange={onChangeCount} style={{ width: 55 }}/></Col>
      <Col md={3}><Button onClick={onClickDeleteButton} style={{ width: 55 }}>삭제</Button></Col>
    </Row>

  );
};

export default RoutineList;
