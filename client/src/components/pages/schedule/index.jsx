import React, { useContext, useState, useEffect, useRef } from 'react';
import { Row, Col, Divider, Button } from 'antd';
import axios from 'axios';
import Calendar from './Calendar/Calendar';
import { ScheduleContext } from '../../../contexts/schedule.context';
import { MembersContext } from '../../../contexts/members.context';
import { AlertContext } from '../../../contexts/alert.context';
import setAuthToken from '../../../utils/setAuthToken';
import Routine from './routine2/Routine';
import { RoutineContext } from '../../../contexts/routine.context';

const Schedule = () => {
  const { targetSchedule } = useContext(ScheduleContext);
  const { saveRoutines, getRoutines } = useContext(RoutineContext);
  const { target } = useContext(MembersContext);
  const { setAlert } = useContext(AlertContext);

  // 루틴 저장
  const handleSaveRoutines = async (delExerCodes, updateRoutine) => {
    const routines = {
      scheduleId: targetSchedule.scheduleId,
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
        setAlert('저장되었습니다.', 'success');
      }
    } catch (err) {
      setAlert('저장실패', 'fail')
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
