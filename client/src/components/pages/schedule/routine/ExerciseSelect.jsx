import React, { useState, useEffect } from 'react';
import { TreeSelect, Input, InputNumber } from 'antd';
import axios from 'axios';
import setAuthToken from '../../../../utils/setAuthToken';

const { TreeNode } = TreeSelect;

const ExerciseSelect = ({getReptitions, getSetCount, getExerciseCode}) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios('/api/exercises/getExercises');
      setExercises(res.data);
    };
    fetchData();
  }, []);

  const InputGroup = Input.Group;
  const [exercises, setExercises] = useState([]); // 최초 fetch용
  const [selectedExercise, setSelectedExercise] = useState('');
  const [reptitions, setReptitions] = useState('');
  const [setCounts, setSetCount] = useState('');

  const handleSelectExercise = code => {
    getExerciseCode(code);
  };

  const handleReptitions = repitions => {
    getReptitions(repitions);
  };

  const handleSetCount = setCount => {
    getSetCount(setCount);
  };

  return (
    <InputGroup compact>
      <TreeSelect
        showSearch
        style={{ width: '60%' }}
        value={selectedExercise}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={handleSelectExercise}
      >
        <TreeNode title="가슴" key="가슴">
          {exercises
            .filter(exercise => exercise.Target === '가슴')
            .map(cv => (
              <TreeNode
                value={cv.ExerciseCode}
                title={cv.ExerciseName}
                key={cv.ExerciseName}
              />
            ))}
        </TreeNode>
        <TreeNode title="하체" key="하체">
          {exercises
            .filter(exercise => exercise.Target === '하체')
            .map(cv => (
              <TreeNode
                value={cv.ExerciseCode}
                title={cv.ExerciseName}
                key={cv.ExerciseName}
              />
            ))}
        </TreeNode>
        <TreeNode title="등" key="등">
          {exercises
            .filter(exercise => exercise.Target === '하체')
            .map(cv => (
              <TreeNode
                value={cv.ExerciseCode}
                title={cv.ExerciseName}
                key={cv.ExerciseName}
              />
            ))}
        </TreeNode>
        <TreeNode title="어깨" key="어깨">
          {exercises
            .filter(exercise => exercise.Target === '어깨')
            .map(cv => (
              <TreeNode
                value={cv.ExerciseCode}
                title={cv.ExerciseName}
                key={cv.ExerciseName}
              />
            ))}
        </TreeNode>
        <TreeNode title="복부" key="복부">
          {exercises
            .filter(exercise => exercise.Target === '복부')
            .map(cv => (
              <TreeNode
                value={cv.ExerciseCode}
                title={cv.ExerciseName}
                key={cv.ExerciseName}
              />
            ))}
        </TreeNode>
        <TreeNode title="이두" key="이두">
          {exercises
            .filter(exercise => exercise.Target === '이두')
            .map(cv => (
              <TreeNode
                value={cv.ExerciseCode}
                title={cv.ExerciseName}
                key={cv.ExerciseName}
              />
            ))}
        </TreeNode>
        <TreeNode title="삼두" key="삼두">
          {exercises
            .filter(exercise => exercise.Target === '삼두')
            .map(cv => (
              <TreeNode
                value={cv.ExerciseCode}
                title={cv.ExerciseName}
                key={cv.ExerciseName}
              />
            ))}
        </TreeNode>
      </TreeSelect>
      <InputNumber
        value={setCounts}
        onChange={handleSetCount}
        style={{ width: '20%' }}
        placeholder={'세트'}
      />
      <InputNumber
        value={reptitions}
        onChange={handleReptitions}
        style={{ width: '20%' }}
        placeholder={'반복'}
      />
    </InputGroup>
  );
};

export default ExerciseSelect;
