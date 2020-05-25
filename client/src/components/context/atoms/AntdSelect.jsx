import React from 'react';
import { Select } from 'antd';
import { v4 as uuid } from 'uuid';
const { Option } = Select;

const AntSelect = props => {
  function handleChange(value) {
    props.setMember(props.members[value]);
  }
  return (
    <div>
      <Select
        defaultValue="회원목록"
        style={{ width: 120 }}
        onChange={handleChange}
      >
        {props.members.map((cv, index) => (
          <Option key={uuid()} value={index}>
            {cv.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AntSelect;
