import React from 'react';
import { Checkbox } from 'antd';

const options = [
    { label: '월', value: 1 },
    { label: '화', value: 2 },
    { label: '수', value: 3 },
    { label: '목', value: 4 },
    { label: '금', value: 5 },
    { label: '토', value: 6 },
    { label: '일', value: 0 },
];

const DaySelect = () => {

    const onChange = checkedValues => {
        console.log('checked = ', checkedValues);
    }

    return (
        <div>
            <Checkbox.Group options={options} defaultValue={[0]} onChange={onChange} />
            <br />
        </div>
  )
}

export default DaySelect;