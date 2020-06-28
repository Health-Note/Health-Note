import { Input, InputNumber, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import setAuthToken from '../../../../utils/setAuthToken';

const { Option, OptGroup } = Select;

const ExerciseSelect = ({ getExerIdAndName }) => {

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/exercises/');
      setExercises(res.data);
    };
    fetchData();
  }, []);

  const InputGroup = Input.Group;
  const [exercises, setExercises] = useState([]); // 최초 fetch용

  const handleSelectExercise = value => {
    const exerciseCode = value.split("|")[0];
    const exerciseName = value.split("|")[1];
    const targetCode = value.split("|")[2];
    const targetName = value.split("|")[3];
    getExerIdAndName(exerciseCode, exerciseName, targetCode, targetName);
  };

  return (
    <InputGroup compact>
      <Select
        placeholder="운동선택"
        style={{ width: 200 }}
        onChange={handleSelectExercise}
      >
        <OptGroup label="가슴">
          {exercises
            .filter(exercise => exercise.targetCode === 1)
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetCode}|${cv.targetName}`}
                key={cv.exerciseCode}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="등">
          {exercises
            .filter(exercise => exercise.targetCode === 2)
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetCode}|${cv.targetName}`}
                key={cv.exerciseCode}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="하체">
          {exercises
            .filter(exercise => exercise.targetCode === 3)
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetCode}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="어깨">
          {exercises
            .filter(exercise => exercise.targetCode === 4)
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetCode}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="복부">
          {exercises
            .filter(exercise => exercise.targetCode === 5)
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetCode}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="이두">
          {exercises
            .filter(exercise => exercise.targetCode === 6)
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetCode}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="삼두">
          {exercises
            .filter(exercise => exercise.targetCode === 7)
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetCode}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="전완">
          {exercises
            .filter(exercise => exercise.targetCode === 8)
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetCode}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
      </Select>
    </InputGroup>
  );
};

export default ExerciseSelect;
