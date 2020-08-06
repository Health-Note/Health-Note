import React, { useEffect, useState } from 'react';
import { Card, Col, Button, InputNumber, Row, Tag, Table, Space } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { SET_UPDATE_ROUTINES } from '../../../../reducers/types';

const { Meta } = Card;
const targetColor = ['#f50', "#2db7f5", "#87d068", "#108ee9", '#FF9800', '#FFC107'];

const RoutineRow = ({ routine, scheduleId, insertCounts, getDelExerCode }) => {

  const [count, setCount] = useState(0);
  const [repetition, setRepetition] = useState(0);
  const dispatch = useDispatch();

  const handleCount = value => {
    setCount(value);
    insertCounts(routine.id, value, repetition)
  };

  const handleRepetitions = value => {
    setRepetition(value);
    insertCounts(routine.id, count, value)
  };

  const onClickDeleteButton = () => {
    getDelExerCode(routine.id);
  };

  return (
    <>
      <Row justify="start" align="middle"
           style={{ padding: 10 }}
      >
        <Col md={3}><Tag color={targetColor[routine.targetCode -1]}>{routine.targetName}</Tag></Col>
        <Col md={9}>{routine.exerciseName}</Col>
        <Col md={3}><InputNumber defaultValue={routine.setCount} onChange={handleCount} style={{ width: 55 }}/></Col>
        <Col md={3}><InputNumber defaultValue={routine.repetitions} onChange={handleRepetitions} style={{ width: 55 }}/></Col>
        <Col offset={3} md={3}><Button onClick={onClickDeleteButton}>삭제</Button></Col>
      </Row>
    </>
  );
};

export default RoutineRow;
