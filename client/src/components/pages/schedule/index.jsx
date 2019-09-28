import React, { useContext, useState } from 'react';
import { Row, Col, Avatar, Typography, Tag, Button } from 'antd';
import moment from 'moment';
import Calendar from './Calendar/Calendar';
// import Routine from "./routine/Routine";
// import RecentWorkOut from "../recentWorkOut/RecentWorkOut";
import {
  RoutineProvider,
  RoutineContext,
} from '../../../contexts/routine.context';
import { ScheduleContext } from '../../../contexts/schedule.context';
import SortableComponent from './routine/SortableHOC';
import ExerciseSelect from './routine/ExerciseSelect';
import MyDrawer from '../../context/atoms/Drawer';
const { Text } = Typography;

function Schedule() {
  const { drawerBoolean, setDrawer, schedules } = useContext(ScheduleContext);
  const { setRoutine } = useContext(RoutineContext);
  const [scheduleId, setScheduleId] = useState('');
  const [memberId, setMemberId] = useState('');
  // 이하 자식 컴포넌트에서 가져오는 state
  const [exerciseCode, setExerciseCode] = useState('');
  const [setCount, setSetCount] = useState('');
  const [reptitions, setReptitions] = useState('');

  const saveRoutines = () => {
    setRoutine(exerciseCode, scheduleId, memberId, setCount, reptitions);
  };

  const getExerciseCode = code => {
    setExerciseCode(code);
  };

  const getSetCount = setCount => {
    setSetCount(setCount);
  };

  const getReptitions = repitions => {
    setReptitions(repitions);
  };

  return (
    <>
        <p>되나</p>
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
                  // setScheduleId(schedule.id);
                  // setMemberId(schedule.memebrId);
                  return (
                    <div key={schedule.id}>
                      <h3 style={{ color: schedule.color }}>
                        <Avatar>U</Avatar> {schedule.title} 회원
                      </h3>
                      <Tag color="volcano">
                        {moment(schedule.start).format('YY년 MM월 DD일')}
                      </Tag>
                      <Text code>
                        {moment(schedule.start).format('HH시mm분')}
                      </Text>
                    </div>
                  );
                })}
              <ExerciseSelect
                getSetCount={getSetCount}
                getReptitions={getReptitions}
                getExerciseCode={getExerciseCode}
              />
              <button>추가</button>
              <SortableComponent />
              <Button onClick={saveRoutines}>저장</Button>
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
}

export default Schedule;
