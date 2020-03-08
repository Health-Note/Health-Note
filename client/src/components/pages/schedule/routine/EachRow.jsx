import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Tag, Button, InputNumber } from 'antd';
import uuid from 'uuid/v4';

const EachRow = ({ routines, removeRoutine, getSetCount, getRepetitions }) => {
  function onChangeSetCount(num) {
    console.log(num)
    getSetCount(num);
  }

  function onChangeRepetitions(num) {
    getRepetitions(num);
  }

  return (
    <>
      <Row>
        <Col lg={3}>
          <strong>{'부위'}</strong>
        </Col>
        <Col lg={9}>
          <strong>{'운동명'}</strong>
        </Col>
        <Col lg={5}>
          <strong>{'세트'}</strong>
        </Col>
        <Col lg={5}>
          <strong>{'반복'}</strong>
        </Col>
        <Col lg={2}>
          <strong>{'삭제'}</strong>
        </Col>
      </Row>
      {routines.map(cv => (
            <div className="sortableBox" key={uuid()}>
          <Row container justify="start">
              <Col lg={3}>
                <Tag
                  color={
                    (cv.target === '가슴' && '#ffc952') ||
                    (cv.target === '등' && '#ff7473') ||
                    (cv.target === '하체' && '#47b8e0') ||
                    (cv.target === '어깨' && '#cff09e') ||
                    (cv.target === '복부' && '#84B1ED') ||
                    (cv.target === '이두' && '#79a8a9') ||
                    (cv.target === '삼두' && '#aacfd0') ||
                    (cv.target === '전완' && '#55967e')
                  }
                >
                  {cv.target}
                </Tag>
              </Col>
              <Col lg={9}>{cv.exerciseName}</Col>
              <Col lg={5}>
                <InputNumber
                  size="small"
                  onChange={onChangeSetCount}
                
                  style={{ width: '70%' }}
                />
              </Col>
              <Col lg={5}>
                <InputNumber
                  size="small"
                  min={1}
                  max={99}
                  defaultValue={10}
                  onChange={onChangeRepetitions}
                  style={{ width: '70%' }}
                />
              </Col>
              <Col lg={2}>
                <Button
                  icon="delete"
                  size="small"
                  name={cv.exerciseCode}
                  onClick={removeRoutine}
                />
              </Col>
          </Row>
            </div>
      ))}
    </>
  );
};

export default EachRow;
