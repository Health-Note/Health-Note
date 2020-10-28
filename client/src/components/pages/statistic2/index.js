import React from 'react';
import { useSelector } from "react-redux";
import { Select } from 'antd';
import CustomRadarChart from '../../context/molecules/CustomRadarChart';

const { Option } = Select;

const Statistics = ({ member: curMember, history }) => {
    const { members } = useSelector(state => state.member);
    console.log('curMember', curMember);
    if (typeof curMember === 'undefined') {
        curMember = members[0];
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
      <>
          <h1>{curMember.memberName}</h1>
          <Select defaultValue={curMember.memberName} style={{ width: 120 }} onChange={handleChange}>
              {members.map(cv => (
                <Option value={cv.memberId}>{cv.memberName}</Option>
              ))}
          </Select>
          <CustomRadarChart style={{width: 100, height: 133}}/>
      </>
    )
}

export default Statistics;
