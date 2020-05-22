import { Input, InputNumber, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import setAuthToken from '../../../../utils/setAuthToken';

const { Option, OptGroup } = Select;

const ExerciseSelect = ({getRepetitions, getSetCount, getExerIdAndName,  }) => {

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/exercises/');
      console.log(res);
      setExercises(res.data);
    };
    fetchData();
  }, []);

  const InputGroup = Input.Group;
  const [exercises, setExercises] = useState([]); // 최초 fetch용
  const [repetitions, setRepetitions] = useState('');
  const [setCounts, setSetCount] = useState('');

  const handleSelectExercise = value => {
    const exerciseCode = value.split("|")[0];
    const exerciseName = value.split("|")[1];
    const exerciseTarget = value.split("|")[2];
    getExerIdAndName(exerciseCode, exerciseName, exerciseTarget);
  };

  const handleRepetitions = useCallback(
    repetitions => {
      getRepetitions(repetitions);
      setRepetitions(repetitions);
    },
    [repetitions]
  );

  const handleSetCount = setCount => {
    getSetCount(setCount);
    setSetCount(setCount);
  };

  return (
    <InputGroup compact>
      <Select
        placeholder="운동"
        style={{ width: 200 }}
        onChange={handleSelectExercise}
      >
        <OptGroup label="가슴">
          {exercises
            .filter(exercise => exercise.targetName === '가슴')
            .map(cv => (
              <Option
                value={
                  cv.exerciseCode + '|' + cv.exerciseName + '|' + cv.targetName
                }
                key={cv.exerciseCode}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="등">
          {exercises
            .filter(exercise => exercise.targetName === '등')
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetName}`}
                key={cv.exerciseCode}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="하체">
          {exercises
            .filter(exercise => exercise.targetName === '하체')
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="어깨">
          {exercises
            .filter(exercise => exercise.targetName === '어깨')
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="복부">
          {exercises
            .filter(exercise => exercise.targetName === '복부')
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="이두">
          {exercises
            .filter(exercise => exercise.targetName === '이두')
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="삼두">
          {exercises
            .filter(exercise => exercise.targetName === '삼두')
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
        <OptGroup label="전완">
          {exercises
            .filter(exercise => exercise.targetName === '전완')
            .map(cv => (
              <Option
                value={`${cv.exerciseCode}|${cv.exerciseName}|${cv.targetName}`}
                key={cv.exerciseName}
              >
                {cv.exerciseName}
              </Option>
            ))}
        </OptGroup>
      </Select>
      ,
      <InputNumber
        value={setCounts}
        onChange={handleSetCount}
        style={{ width: '20%' }}
        placeholder={'세트'}
      />
      <InputNumber
        value={repetitions}
        onChange={handleRepetitions}
        style={{ width: '20%' }}
        placeholder={'반복'}
      />
    </InputGroup>
  );
};

export default ExerciseSelect;
