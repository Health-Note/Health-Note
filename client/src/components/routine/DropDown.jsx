import React, { useContext } from 'react';
import { TreeSelect  } from 'antd';
import { ExerciseContext } from '../../contexts/exercise.context';

function DropDown ({ exercises }) {

  const { setSelectedExer } = useContext(ExerciseContext);
  const { TreeNode } = TreeSelect;
  
  const onChange = value => {
    console.log(value);
    setSelectedExer( value );
  };
  
  return (
    <TreeSelect
      showSearch
      style={{ width: 100 }}
      value={exercises.category}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="Please select"
      allowClear
      treeDefaultExpandAll
      onChange={onChange}
    >
      <TreeNode value={exercises.category} title={exercises.category} key="0-1">
        {exercises.kind.map(exercise => [
            <TreeNode value={exercise} title={exercise} key="random" />
        ])}
      </TreeNode>
    </TreeSelect>
  );
}
  
export default DropDown;
