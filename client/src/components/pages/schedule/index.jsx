import React, { useContext, useState, useEffect, useRef } from 'react';
import { Row, Col, Divider, Button } from 'antd';
import axios from 'axios';
import Calendar from './Calendar/Calendar';
import setAuthToken from '../../../utils/setAuthToken';
import Routine from './routine2/Routine';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberRequestAction } from '../../../reducers/members.reducer';
import { CLEAR_ROUTINE } from '../../../reducers/types';

const Schedule = () => {
  const { id } = useSelector(state => state.schedule.selectedSchedule);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberRequestAction());
    dispatch({ type: CLEAR_ROUTINE });
  }, [])

  // 루틴 저장
  const handleSaveRoutines = async (delExerCodes, updateRoutine) => {
    const routines = {
      scheduleId: id,
      deleteRoutine: [...delExerCodes],
      updateRoutine: updateRoutine,
    }
    console.log(routines);
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/routines', routines);
      if (res.data) {
      }
    } catch (err) {
    }
  };

  return (
    <>
      <Row gutter={50}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Calendar/>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Routine saveRoutines={handleSaveRoutines}/>
        </Col>
      </Row>
    </>
  );
};

export default Schedule;
