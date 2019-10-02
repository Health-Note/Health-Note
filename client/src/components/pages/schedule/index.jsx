import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Row, Col, Divider, Typography, Affix, Button } from 'antd';
import moment from 'moment';
import Calendar from './Calendar/Calendar';
import { RoutineContext } from '../../../contexts/routine.context';
import { ScheduleContext } from '../../../contexts/schedule.context';
import SortableComponent from './routine/SortableHOC';
import ExerciseSelect from './routine/ExerciseSelect';
import MyDrawer from '../../context/atoms/Drawer';
const { Text } = Typography;

const Schedule = () => {
  const { drawerBoolean, setDrawer, schedules, targetSchedule } = useContext(
    ScheduleContext
  );
  const { insertRoutine } = useContext(RoutineContext);

  // 자식 컴포넌트에서 가져오는 state
  const [exerciseCode, setExerciseCode] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [target, setTarget] = useState('');
  const [setCount, setSetCount] = useState('');
  const [repetitions, setRepetitions] = useState('');

  // 운동 리스트
  const [routines, setRoutines] = useState([]);

  const getExerCodeAndName = value => {
    setExerciseCode(value.split('|')[0]);
    setExerciseName(value.split('|')[1]);
    setTarget(value.split('|')[2]);
  };

  const getSetCount = setCount => {
    setSetCount(setCount);
  };

  const getRepetitions = reptitions => {
    setRepetitions(reptitions);
  };

  // state추가
  const insertExercise = () => {
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

  // 다른멤버 선택했을 때 기존에 채우던 state초기화
  useEffect(() => {
    setRoutines([]);
  }, [targetSchedule.memberId]);

  // db저장 (ajax)
  const saveRoutines = () => {
    insertRoutine(routines);
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
                  <Row container justify="start" align="middle">
                    <div key={schedule.id}>
                      <Col lg={11}>
                        <h3 style={{ color: schedule.color }}>
                          {schedule.title} 회원
                        </h3>
                      </Col>
                      <Col lg={13}>
                        {moment(schedule.start).format('MM월 DD일 / HH시 mm분')}
                      </Col>
                    </div>
                  </Row>
                );
              })}
            <ExerciseSelect
              getSetCount={getSetCount}
              getRepetitions={getRepetitions}
              getExerCodeAndName={getExerCodeAndName}
            />
            <Button style={{ marginTop: '5px' }} onClick={insertExercise} block>
              추가하기
            </Button>
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
            <Divider>루틴목록↓</Divider>
            <SortableComponent routines={routines} />
            <Button
              type="primary"
              onClick={saveRoutines}
              block
            >
              저장
            </Button>
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
