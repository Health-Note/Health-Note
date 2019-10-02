import React, { Component } from 'react';
import {
  SortableContainer,
  SortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Tag, Row, Col } from 'antd';
import uuid from 'uuid/v4';
import './routine.css';

// const DragHandle = sortableHandle(() => <span>::</span>);

const makeTargetColor = ({ value }) => {
  console.log('!!!!!!!!!', value.split('|')[0]);
};

const SortableItem = SortableElement(({ value }) => (
  <>
    <Row container justify="start">
      <div className="sortableBox">
        <Col lg={4}>
          <Tag
            color={
              (value.split('|')[0] === '가슴' && '#ffc952') ||
              (value.split('|')[0] === '등' && '#ff7473') ||
              (value.split('|')[0] === '하체' && '#47b8e0') ||
              (value.split('|')[0] === '어깨' && '#cff09e') ||
              (value.split('|')[0] === '복부' && '#84B1ED') ||
              (value.split('|')[0] === '이두' && '#79a8a9') ||
              (value.split('|')[0] === '삼두' && '#aacfd0') ||
              (value.split('|')[0] === '전완' && '#55967e')
            }
            onClick={makeTargetColor}
          >
            {value.split('|')[0]}{' '}
          </Tag>
        </Col>
        <Col lg={11}>{value.split('|')[1]}</Col>
        <Col lg={9}>
          <Tag>{value.split('|')[2]} 세트</Tag>
          <Tag>{value.split('|')[3]} 반복</Tag>
        </Col>
      </div>
    </Row>
  </>
));

const SortableList = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <SortableItem key={uuid()} index={index} value={value} />
      ))}
    </div>
  );
});

class SortableComponent extends Component {
  state = {
    items: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(prevState.items);
    console.log(nextProps.routines);
    if (prevState.items.length !== nextProps.routines.length) {
      return {
        items: nextProps.routines.map(
          (cv, idx) =>
            `${cv.target}|${cv.exerciseName}|${cv.setCount}|${cv.repetitions}`
        ),
      };
    }
    return null;
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex),
    }));
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}

export default SortableComponent;
