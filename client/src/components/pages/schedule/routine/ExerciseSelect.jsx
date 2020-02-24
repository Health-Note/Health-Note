import React, { useState, useEffect, useCallback } from 'react';
import { Select, Input, InputNumber, Button, Dropdown, Menu } from 'antd';
import axios from 'axios';
import setAuthToken from '../../../../utils/setAuthToken';

const { Option, OptGroup } = Select;

const ExerciseSelect = ({
  getRepetitions,
  getSetCount,
  getExerciseCode,
  getExerCodeAndName,
}) => {
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
  const [selectedExercise, setSelectedExercise] = useState();
  const [repetitions, setRepetitions] = useState('');
  const [setCounts, setSetCount] = useState('');

  const handleSelectExercise = value => {
    getExerCodeAndName(value);
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

  const dropDown = (
      <Menu>
        {exercises.filter(cv => cv.ExerciseCode >= 100 && cv.ExerciseCode < 200).map(cv => (
              <Menu.Item>
                <a target="_blank" rel="noopener">
                  {cv.ExerciseName}
                </a>
              </Menu.Item>
          ))}
      </Menu>
);

  return (
      <>
        <Dropdown overlay={dropDown} placement={"bottomLeft"}>
          <Button>가슴</Button>
        </Dropdown>
      </>
    // <InputGroup compact>
    //   <Select
    //     placeholder="운동"
    //     style={{ width: 200 }}
    //     onChange={handleSelectExercise}
    //   >
    //     <OptGroup label="가슴">
    //       {exercises
    //         .filter(exercise => exercise.Target === '가슴')
    //         .map(cv => (
    //           <Option
    //             value={
    //               cv.ExerciseCode + '|' + cv.ExerciseName + '|' + cv.Target
    //             }
    //             key={cv.ExerciseCode}
    //           >
    //             {cv.ExerciseName}
    //           </Option>
    //         ))}
    //     </OptGroup>
    //     <OptGroup label="등">
    //       {exercises
    //         .filter(exercise => exercise.Target === '등')
    //         .map(cv => (
    //           <Option
    //             value={`${cv.ExerciseCode}|${cv.ExerciseName}|${cv.Target}`}
    //             key={cv.ExerciseCode}
    //           >
    //             {cv.ExerciseName}
    //           </Option>
    //         ))}
    //     </OptGroup>
    //     <OptGroup label="하체">
    //       {exercises
    //         .filter(exercise => exercise.Target === '하체')
    //         .map(cv => (
    //           <Option
    //             value={`${cv.ExerciseCode}|${cv.ExerciseName}|${cv.Target}`}
    //             key={cv.ExerciseName}
    //           >
    //             {cv.ExerciseName}
    //           </Option>
    //         ))}
    //     </OptGroup>
    //     <OptGroup label="어깨">
    //       {exercises
    //         .filter(exercise => exercise.Target === '어깨')
    //         .map(cv => (
    //           <Option
    //             value={`${cv.ExerciseCode}|${cv.ExerciseName}|${cv.Target}`}
    //             key={cv.ExerciseName}
    //           >
    //             {cv.ExerciseName}
    //           </Option>
    //         ))}
    //     </OptGroup>
    //     <OptGroup label="복부">
    //       {exercises
    //         .filter(exercise => exercise.Target === '복부')
    //         .map(cv => (
    //           <Option
    //             value={`${cv.ExerciseCode}|${cv.ExerciseName}|${cv.Target}`}
    //             key={cv.ExerciseName}
    //           >
    //             {cv.ExerciseName}
    //           </Option>
    //         ))}
    //     </OptGroup>
    //     <OptGroup label="이두">
    //       {exercises
    //         .filter(exercise => exercise.Target === '이두')
    //         .map(cv => (
    //           <Option
    //             value={`${cv.ExerciseCode}|${cv.ExerciseName}|${cv.Target}`}
    //             key={cv.ExerciseName}
    //           >
    //             {cv.ExerciseName}
    //           </Option>
    //         ))}
    //     </OptGroup>
    //     <OptGroup label="삼두">
    //       {exercises
    //         .filter(exercise => exercise.Target === '삼두')
    //         .map(cv => (
    //           <Option
    //             value={`${cv.ExerciseCode}|${cv.ExerciseName}|${cv.Target}`}
    //             key={cv.ExerciseName}
    //           >
    //             {cv.ExerciseName}
    //           </Option>
    //         ))}
    //     </OptGroup>
    //     <OptGroup label="전완">
    //       {exercises
    //         .filter(exercise => exercise.Target === '전완')
    //         .map(cv => (
    //           <Option
    //             value={`${cv.ExerciseCode}|${cv.ExerciseName}|${cv.Target}`}
    //             key={cv.ExerciseName}
    //           >
    //             {cv.ExerciseName}
    //           </Option>
    //         ))}
    //     </OptGroup>
    //   </Select>
    //   ,
    //   <InputNumber
    //     value={setCounts}
    //     onChange={handleSetCount}
    //     style={{ width: '20%' }}
    //     placeholder={'세트'}
    //   />
    //   <InputNumber
    //     value={repetitions}
    //     onChange={handleRepetitions}
    //     style={{ width: '20%' }}
    //     placeholder={'반복'}
    //   />
    // </InputGroup>
  );
};

export default ExerciseSelect;
