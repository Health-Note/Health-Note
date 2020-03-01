import React, { useState, useEffect, useCallback } from 'react';

const EachRow = () => { 
    return(
        <>
        <Row container justify="start">
        <div className="sortableBox">
          <Col lg={3}>
            <Tag color={
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
              {target}>
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
    )
}

export default EachRow;