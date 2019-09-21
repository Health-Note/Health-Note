import React, { useState } from 'react';
import { TreeSelect, Input, InputNumber } from 'antd';

const { TreeNode } = TreeSelect;

const Exercises = {
  가슴: ['벤치프레스', '펙덱플라이', '덤벨프레스', '덤벨플라이', '푸쉬업'],
  등: ['턱걸이', '바벨로우', '렛풀다운'],
  하체: ['스쿼트', '프론트스쿼트', '런지'],
  어깨: ['밀리터리프레스', '덤벨프레스', '사이드 레터럴 레이즈'],
  삼두: [
    '트라이셉스 푸쉬 다운',
    '원 암 리버스 푸쉬 다운',
    '라잉 트라이셉스 익스텐션',
    '트라이셉스 킥 백',
    '트라이셉스 익스텐션',
    '트라이셉스 딥스',
  ],
  이두: ['바벨컬', '덤벨컬'],
  유산소: ['러닝', '바이크'],
};

const ExerciseSelect = () => {
  const [value, setValue] = useState('');
  const InputGroup = Input.Group;

  const onChange = value => {
    console.log(value);
    setValue(value);
  };

  return (
    <InputGroup compact>
      <TreeSelect
        showSearch
        style={{ width: '60%' }}
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
      >
        <TreeNode value="가슴" title="가슴" key="가슴">
          {Exercises.가슴.map(cv => (
            <TreeNode value={cv} title={cv} key={cv} />
          ))}
        </TreeNode>

        <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
          <TreeNode
            value="sss"
            title={<b style={{ color: '#08c' }}>sss</b>}
            key="random3"
          />
        </TreeNode>
      </TreeSelect>
      <InputNumber
        style={{ width: '20%' }}
        placeholder={'세트'}
        defaultValue={0}
      />
      <InputNumber
        style={{ width: '20%' }}
        placeholder={'반복'}
        defaultValue={0}
      />
    </InputGroup>
  );
};

export default ExerciseSelect;
