import React, { useState } from 'react';
import { Card, Col, Button, InputNumber, Row, Tag, Table, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';

const { Meta } = Card;
const targetColor = ['#f50', "#2db7f5", "#87d068", "#108ee9", '#FF9800', '#FFC107'];

const RoutineRow = ({ routine, insertCounts, getDelExerCode }) => {

  const [count, setCount] = useState(0);
  const [repetition, setRepetition] = useState(0);

  const onChangeCount = value => {
    setCount(value);
    insertCounts(routine.exerciseCode, count, repetition);
  };

  const onChangeRepetition = value => {
    setRepetition(value);
    insertCounts(routine.exerciseCode, count, repetition);
  };

  const onClickDeleteButton = () => {
    getDelExerCode(routine.exerciseCode);

  };

  return (
    <>
      <Row justify="start" align="middle"
           style={{ width: 500, padding: 10 }}
      >
        <Col md={3}><Tag color={targetColor[routine.targetCode -1]}>{routine.targetName}</Tag></Col>
        <Col md={9}>{routine.exerciseName}</Col>
        <Col md={3}><InputNumber onChange={onChangeRepetition} style={{ width: 55 }}/></Col>
        <Col md={3}><InputNumber onChange={onChangeCount} style={{ width: 55 }}/></Col>
        <Col offset={3} md={3}><Button onClick={onClickDeleteButton}>삭제</Button></Col>
      </Row>
    </>
  );
};

export default RoutineRow;
