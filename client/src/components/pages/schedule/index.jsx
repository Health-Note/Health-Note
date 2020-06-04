import React, { useContext, useState, useEffect, useRef } from 'react';
import { Row, Col, Divider, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import Calendar from './Calendar/Calendar';
import { ScheduleContext } from '../../../contexts/schedule.context';
import { AlertContext } from '../../../contexts/alert.context';
import ExerciseSelect from './routine/ExerciseSelect';
import MyDrawer from '../../context/atoms/Drawer';
import setAuthToken from '../../../utils/setAuthToken';
import EachRow from './routine/EachRow';
import Routine from './routine2/Routine';

const Schedule = () => {
  const { drawerBoolean, setDrawer, schedules, targetSchedule } = useContext(
    ScheduleContext
  );
  const { setAlert } = useContext(AlertContext);

  // 자식 컴포넌트에서 가져오는 state
  const [setCount, setSetCount] = useState(0);
  const [repetitions, setRepetitions] = useState(0);

  // 운동 리스트
  const [routines, setRoutines] = useState([]);

  // 자식컴포넌트로 보내서 운동코드, 운동이름, 타겟을 가져오는 함수
  const getExerIdAndName = (exerciseName, exerciseCode, target) => {
    setRoutines(prevState => [
      ...prevState,
      {
        exerciseCode,
        exerciseName,
        target,
        scheduleId: targetSchedule.id,
        memberId: targetSchedule.memberId,
        setCount,
        repetitions,
      },
    ]);
  };

  const getSetCount = count => {
    setSetCount(count);
  };

  const getRepetitions = repetitions => {
    setRepetitions(repetitions);
  };

  const removeRoutine = event => {
    const deletedItems = routines.filter(
      cv => cv.exerciseCode !== Number(event.target.name)
    );
    setRoutines(deletedItems);
  };

  // 다른멤버 선택했을 때 기존에 채우던 state초기화
  useEffect(() => {
    const getRoutines = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      try {
        const res = await axios.get(
          `/api/routine/${targetSchedule.id}`
        );
        setRoutines(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRoutines();
  }, [targetSchedule.id]);

  // 루틴 저장
  const saveRoutines = async () => {
    const db_routines = routines.map(cv => ({
      exerciseCode: cv.exerciseCodeseId,
      exerciseName: cv.exerciseName,
      target: cv.target,
      scheduleId: targetSchedule.scheduleId,
      memberId: targetSchedule.memberId,
      setCount: setCount,
      repetitions: repetitions,
    }))

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/routine', {
        routines: db_routines,
        scheduleId: targetSchedule.id,
      });
      if (res.data) {
        setAlert('저장되었습니다.', 'success');
      }
    } catch (err) {
      setAlert('저장실패', 'fail')
    }
  };

  return (
    <>
      <Row gutter={20}>
        <Col span={12}>
          <Calendar />
        </Col>
        <Col>
          <h2>운동루틴</h2>
          <Routine/>
        </Col>
      </Row>
      <Row container justify="center">
        <Col xs={12} md={12} lg={12}></Col>
      </Row>
      <Row container justify="center">
        <Col xs={8} lg={12}></Col>
      </Row>
    </>
  );
};

export default Schedule;
