import React, { Component } from 'react';
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import axios from 'axios';
import uuid from 'uuid/v4';
import { Tag, Row, Col, Button, Icon } from 'antd';
import setAuthToken from '../../../../utils/setAuthToken';
import { AlertContext } from '../../../../contexts/alert.context';
import './routine.css';

// const DragHandle = sortableHandle(() => <span>::</span>);

const SortableItem = SortableElement(({ value, removeRoutine }) => {
  const { target, exerciseName, setCount, repetitions, exerciseCode } = value;
  return (
    <>
      <Row container justify="start">
        <div className="sortableBox">
          <Col lg={3}>
            <Tag
              color={
                (target === '가슴' && '#ffc952') ||
                (target === '등' && '#ff7473') ||
                (target === '하체' && '#47b8e0') ||
                (target === '어깨' && '#cff09e') ||
                (target === '복부' && '#84B1ED') ||
                (target === '이두' && '#79a8a9') ||
                (target === '삼두' && '#aacfd0') ||
                (target === '전완' && '#55967e')
              }
            >
              {target}
            </Tag>
          </Col>
          <Col lg={10}>{exerciseName}</Col>
          <Col lg={9}>
            <Tag>{setCount} 세트</Tag>
            <Tag>{repetitions} 반복</Tag>
          </Col>
          <Col lg={3}>
            <Button
              icon="delete"
              size="small"
              name={exerciseCode}
              onClick={removeRoutine}
            />
          </Col>
        </div>
      </Row>
    </>
  );
});


// 부보 스테이트
// 자식 
const SortableList = SortableContainer(({ items, removeRoutine }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem
          key={uuid()}
          index={index}
          value={value}
          items={items}
          removeRoutine={removeRoutine}
        />
      ))}
    </div>
  );
});

class SortableComponent extends Component {
  static contextType = AlertContext;
  state = {
    items: [],
  };

  // 루틴으로부터 계속 원본이 오기에 드래그앤 드롭을 해도 바뀌지 않는다.
  static getDerivedStateFromProps(nextProps, prevState) {
    const isSameLength = prevState.items.length === nextProps.routines.length;
    return {
      items: nextProps.routines.map((cv, idx) => ({
        id: cv.id,
        target: cv.target,
        exerciseName: cv.exerciseName,
        setCount: cv.setCount,
        repetitions: cv.repetitions,
        exerciseCode: cv.exerciseCode,
        scheduleId: cv.scheduleId,
        memberId: cv.memberId,
      })),
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  // db저장 (ajax)
  insertRoutine = async () => {
    const { setAlert } = this.context;
    const routines = this.state.items.map((cv, idx) => ({
      SetCount: cv.setCount,
      Repetitions: cv.repetitions,
      ExerciseCode: cv.exerciseCode,
      ScheduleId: this.props.selectedScheduleId,
      MemberId: cv.memberId,
      RoutineOrder: idx,
    }));

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.post('/api/routine', {
        routines,
        scheduleId: this.props.selectedScheduleId,
      });
      if (res.data) {
        setAlert('저장되었습니다.', 'success');
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <SortableList
          items={this.state.items}
          onSortEnd={this.onSortEnd}
          removeRoutine={this.props.removeRoutine}
        />
        <Button type="primary" onClick={this.insertRoutine} block>
          저장
        </Button>
      </>
    );
  }
}

export default SortableComponent;
