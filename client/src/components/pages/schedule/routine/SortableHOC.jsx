import React, { Component } from 'react';
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import axios from 'axios';
import { Tag, Row, Col, Button, Icon } from 'antd';
import uuid from 'uuid/v4';
import setAuthToken from '../../../../utils/setAuthToken';
import './routine.css';

// const DragHandle = sortableHandle(() => <span>::</span>);

const SortableItem = SortableElement(({ value, removeRoutine }) => {
  const type = value.split('|')[0];
  return (
    <>
      <Row container justify="start">
        <div className="sortableBox">
          <Col lg={3}>
            <Tag
              color={
                (type === '가슴' && '#ffc952') ||
                (type === '등' && '#ff7473') ||
                (type === '하체' && '#47b8e0') ||
                (type === '어깨' && '#cff09e') ||
                (type === '복부' && '#84B1ED') ||
                (type === '이두' && '#79a8a9') ||
                (type === '삼두' && '#aacfd0') ||
                (type === '전완' && '#55967e')
              }
            >
              {value.split('|')[0]}{' '}
            </Tag>
          </Col>
          <Col lg={10}>{value.split('|')[1]}</Col>
          <Col lg={9}>
            <Tag>{value.split('|')[2]} 세트</Tag>
            <Tag>{value.split('|')[3]} 반복</Tag>
          </Col>
          <Col lg={3}>
            <Button
              icon="delete"
              size="small"
              onClick={removeRoutine}
              name={value.split('|')[4]}
            />
          </Col>
        </div>
      </Row>
    </>
  );
});

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
  state = {
    items: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerived', prevState.items);
    const isSame = prevState.items.length === nextProps.routines.length;
    // prevState.items.every((element, index) => {
    //   return element === nextProps.routines[index];
    // });
    if (!isSame) {
      return {
        items: nextProps.routines.map(
          (cv, idx) =>
            `${cv.target}|${cv.exerciseName}|${cv.setCount}|
            ${cv.repetitions}|${cv.exerciseCode}|${cv.scheduleId}|${cv.memberId}`
        ),
      };
    }
    return null;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };

  // db저장 (ajax)
  insertRoutine = async () => {
    console.log(this.state.items);
    const routines = this.state.items.map((cv, idx) => ({
      SetCount: cv.split('|')[2],
      Repetitions: cv.split('|')[3],
      ExerciseCode: cv.split('|')[4],
      ScheduleId: this.props.selectedScheduleId,
      MemberId: cv.split('|')[6],
      RoutineOrder: idx,
    }));

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  
    try {
      const res = await axios.post('/api/routine', {
        routines,
        scheduleId: this.props.selectedScheduleId
      });
      console.log(res.data);
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
