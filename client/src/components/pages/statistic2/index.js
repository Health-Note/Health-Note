import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Select } from 'antd';
import CustomRadarChart from '../../context/molecules/CustomRadarChart';

const { Option } = Select;

// 기간에 따른 빈도수
const dummyData = {
  pieChart: {
    name: {
      exerciseName1: 10,
      exerciseName2: 20,
      exerciseName3: 30,
    },
    name2: {
      exerciseName1: 15,
      exerciseName2: 20,
      exerciseName3: 35,
    }
  },

};

const Statistics = ({ member: curMember, history }) => {
    const { members } = useSelector(state => state.member);

  if (typeof curMember === 'undefined') {
    curMember = members[0];
  }
  console.log('curMember', curMember);

  function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
      <>
          <h1>{curMember.memberName}</h1>
          <Select defaultValue={curMember.memberName} style={{ width: 120 }} onChange={handleChange}>
              {members.map(cv => (
                <Option key={cv.id} value={cv.id}>{cv.memberName}</Option>
              ))}
          </Select>
          <CustomRadarChart style={{width: 100, height: 133}}/>
      </>
    )
}


export default Statistics;
