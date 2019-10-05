import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SearchSelect from '../../context/molecules/SearchSelect';
import RadarChart from '../../context/molecules/SimpleRadarChart';
import RadialBarChart from '../../context/molecules/SimpleRadialBarChart';
import { MembersContext } from '../../../contexts/members.context';

const useStyles = makeStyles(theme => ({
  select: {
    display: 'flex',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(3, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ptContWrap: {
    textAlign: 'center',
  },
  infoText: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '0.00938em',
    paddingBottom: theme.spacing(1),
  },
  secondColumn: {
    display: 'flex',
    padding: theme.spacing(3, 0),
    '& > div': {
      display: 'inline-block',
    },
  },
  boardWrap: {
    width: '100%',
    border: '1px solid #bdbdbd',
    borderRadius: '10px',
  },
}));

// 추후 api 에서 데이터 받아올
const data = [
  { name: '등', value: 400 },
  { name: '유산소', value: 300 },
  { name: '가슴', value: 300 },
  { name: '삼두', value: 400 },
  { name: '이두', value: 350 },
  { name: '어깨', value: 300 },
  { name: '하체', value: 200 },
];

function Statistics({ member }) {
  // Routes.js에서 오는 member
  const classes = useStyles();
  const { members } = useContext(MembersContext);
  const [memberIndex, setMemberIndex] = useState(0);
  const curMember = members[memberIndex];
  const list = members.map((member, index) => ({
    label: member.name,
    index,
    phoneNum: member.phoneNum,
  }));

  const ptCountData = [
    {
      name: '전체 PT 수',
      uv: curMember.totalPT,
      fill: '#d0ed57',
    },
    {
      name: '출석일',
      uv: curMember.usedPT,
      fill: '#ffc658',
    },
  ];

  /**
   *
   */
  const handleChangeMember = selectObj => {
    debugger;
    setMemberIndex(selectObj.index);
  };

  console.dir(members);

  return (
    <div className="h-Statistic">
      <Paper className={classes.paper}>
        <div className={classes.select}>
          <SearchSelect
            label="회원"
            placeholder="이름"
            list={list}
            value={list[memberIndex]}
            onChange={handleChangeMember}
          />
          <span> 회원님</span>
        </div>
        <div className={classes.ptContWrap}>
          <div className={classes.infoText}>남은 PT 수 / 전체 PT 수</div>
          <div>
            {curMember.totalPT - curMember.usedPT} / {curMember.totalPT}
            {/* {curMember.totalPT - curMember.usedPT} / 10 */}
          </div>
        </div>
      </Paper>
      <div className={classes.secondColumn}>
        <RadarChart data={data} />
        <RadialBarChart data={ptCountData} className={classes.chart} />
        <div className={classes.boardWrap}>메모성 게시판</div>
      </div>
    </div>
  );
}

export default Statistics;
