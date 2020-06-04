import MyDrawer from '../../../context/atoms/Drawer';
import { Button, Col, Divider, Row } from 'antd';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import ExerciseSelect from './ExerciseSelect';
import EachRow from './EachRow';
import React from 'react';

const RoutineDrawer = () => {
  return (
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
        <ExerciseSelect getExerIdAndName={getExerIdAndName}/>
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
  );
};

export default RoutineDrawer;
