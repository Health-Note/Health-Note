import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = ({ options, handleCheckBox }) => {
  const onChange = checkedValue => {
    handleCheckBox(checkedValue);
  };

  return (
    <div>
      <Checkbox.Group options={options} defaultValue={[]} onChange={onChange} />
      <br />
    </div>
  );
};

export default CheckboxGroup;
