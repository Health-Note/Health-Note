import React, { useContext, useState, useEffect, useRef } from 'react';
import { Row, Col, Divider, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import uuid from 'uuid/v4';
import Calendar from './Calendar/Calendar';
import { ScheduleContext } from '../../../contexts/schedule.context';
import { AlertContext } from '../../../contexts/alert.context';
import ExerciseSelect from './routine/ExerciseSelect';
import MyDrawer from '../../context/atoms/Drawer';
import setAuthToken from '../../../utils/setAuthToken';
import EachRow from './routine/EachRow';

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
  const getExerCodeAndName = (exerciseName, exerciseCode, target) => {
    setRoutines(prevState => [
      ...prevState,
      {
        exerciseCode,
        exerciseName,
        target,
        scheduleId: targetSchedule.scheduleId,
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
          `/api/routine/${targetSchedule.scheduleId}`
        );
        setRoutines(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRoutines();
  }, [targetSchedule.scheduleId]);

  // 루틴 저장
  const saveRoutines = async () => {
    const db_routines = routines.map(cv => ({
      ExerciseCode: cv.exerciseCode,
      ExerciseName: cv.exerciseName,
      Target: cv.Target,
      ScheduleId: targetSchedule.scheduleId,
      MemberId: targetSchedule.memberId,
      SetCount: setCount,
      Repetitions: repetitions, 
    }))

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.post('/api/routine', {
        routines: db_routines,
        scheduleId: targetSchedule.scheduleId,
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
      <Row container spacing={0} justify="center">
        <Col xs={5} md={5} lg={18}>
          <Calendar />
        </Col>
        <MyDrawer
          title={'루틴관리'}
          setDrawer={setDrawer}
          drawerBoolean={drawerBoolean}
        >
          <Col lg={24}>
            {schedules
              .filter(schedule => schedule.target === true)
              .map(schedule => {
                return (
                  <Row container justify="start" align="middle" key={uuid()}>
                    <Col lg={11}>
                      <h3 style={{ color: schedule.color }}>
                        {schedule.title} 회원
                      </h3>
                    </Col>
                    <Col lg={13}>
                      {moment(schedule.start).format('MM월 DD일 / HH시 mm분')}
                    </Col>
                  </Row>
                );
              })}
            <ExerciseSelect getExerCodeAndName={getExerCodeAndName} />
            <Divider>루틴목록↓</Divider>
            <EachRow
              getSetCount={getSetCount}
              getRepetitions={getRepetitions}
              removeRoutine={removeRoutine}
              routines={routines}
            />
            <Button type="primary" onClick={saveRoutines} block>
              저장
            </Button>
            {/* <Button style={{ marginTop: '5px' }} onClick={insertExercise} block>
              추가하기
            </Button> */}
            {/* <Row container justify="start">
              <div style={{marginTop: "10px"}}>
                <Col lg={15}>
                  {"운동명"}
                </Col>
                <Col lg={9}>
                  <Tag>세트수</Tag>
                  <Tag>반복수</Tag>
                </Col>
              </div>
            </Row> */}
            {/* <SortableComponent
              routines={routines}
              removeRoutine={removeRoutine}
              selectedScheduleId={targetSchedule.scheduleId}
            /> */}
          </Col>
        </MyDrawer>
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
