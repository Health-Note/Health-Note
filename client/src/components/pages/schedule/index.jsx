import React, { useEffect, useRef } from 'react';
import { Row, Col, message } from 'antd';
import Calendar from './Calendar/Calendar';
import Routine from './routine2/Routine';
import { useDispatch, useSelector } from 'react-redux';
import { getMemberRequestAction } from '../../../reducers/members.reducer';
import { CLEAR_ROUTINE } from '../../../reducers/types';

const Schedule = () => {
  const { id } = useSelector(state => state.schedule.selectedSchedule);
  const { saveRoutineDone, routineError, routines } = useSelector(state => state.routine);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberRequestAction());
    dispatch({ type: CLEAR_ROUTINE });
  }, [])

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
       saveRoutineDone && message.success('루틴이 저장 되었습니다.');
    }
  }, [saveRoutineDone, routines]);

  useEffect(() => {
    routineError && message.error('루틴 에러.');
  }, [routineError])

  return (
    <>
      <Row gutter={50}>
        <Col xs={24} sm={24} md={24} lg={13} xl={13}>
          <Calendar/>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <Routine />
        </Col>
      </Row>
    </>
  );
};

export default Schedule;
