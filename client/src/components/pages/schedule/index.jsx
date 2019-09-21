import React from 'react';
import { Row, Col } from 'antd';
import Calendar from './Calendar/Calendar';
// import Routine from "./routine/Routine";
// import RecentWorkOut from "../recentWorkOut/RecentWorkOut";
import { RoutineProvider } from '../../../contexts/routine.context';
import SortableComponent from './routine/SortableHOC';
import ExerciseSelect from './routine/ExerciseSelect';

function Schedule() {
  return (
    <>
      <RoutineProvider>
        <Row container spacing={0} justify="center">
          <Col xs={5} md={5} lg={18}>
            <Calendar />
          </Col>
          <Col lg={6}>
            <h3>00회원 00일 루틴</h3>
            <ExerciseSelect />
            <button>추가</button>
            <SortableComponent />
          </Col>
        </Row>
        <Row container justify="center">
          <Col xs={12} md={12} lg={12}></Col>
        </Row>
        <Row container justify="center">
          <Col xs={8} lg={12}></Col>
        </Row>
      </RoutineProvider>
    </>
  );
}

export default Schedule;
