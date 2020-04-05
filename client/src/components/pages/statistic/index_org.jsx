import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import SearchSelect from '../../context/molecules/SearchSelect';
import RadarChart from '../../context/molecules/SimpleRadarChart';
import RadialBarChart from '../../context/molecules/SimpleRadialBarChart';
import InteractiveList from '../../context/molecules/InteractiveList';
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
      margin: '20px 40px',
    },
  },
  boardWrap: {
    width: '100%',
    border: '1px solid #bdbdbd',
    borderRadius: '10px',
    overflow: 'auto',
    wordBreak: 'break-all',
    padding: theme.spacing(2),
    boxShadow: '10px 10px 5px -1px rgba(158,158,158,1)',
  },
  addNoteWrap: {
    display: 'flex',
    margin: '20px 0',
  },
  textField: {
    width: '100%',
  },
  fab: {
    marginLeft: theme.spacing(1),
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

let listScrollTop = 'top';
function Statistics({ member: curMember, history }) {
  // Routes.js에서 오는 member
  const classes = useStyles();
  const { members } = useContext(MembersContext);
  let memberIndex = 0;
  const [posts, setPosts] = useState([]);
  const [newNote, setNewNote] = useState('');
  if (typeof curMember === 'undefined') {
    curMember = members[0];
  }
  const list = members.map((member, index) => {
    if (member.id === curMember.id) {
      memberIndex = index;
    }
    return {
      label: member.name,
      index,
      phoneNum: member.phoneNum,
    };
  });

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

  useEffect(() => {
    setPosts([
      {
        contents: '내용내용내용내용',
        secondary: moment('2019-10-01').fromNow(),
      },
      {
        contents: '내용내용내용내용222',
        secondary: moment('2019-10-02').fromNow(),
      },
      {
        contents: '내용내용내용내용3333',
        secondary: moment('2019-10-02').fromNow(),
      },
      {
        contents: '내용내용내용내용4444',
        secondary: moment('2019-10-03').fromNow(),
      },
      {
        contents: '내용내용내용내용55555',
        secondary: moment('2019-10-08').fromNow(),
      },
      {
        contents: '6666666666666666666666666666666',
        secondary: moment('2019-10-08').fromNow(),
      },
      {
        contents:
          '7777777777777777777777777777777777777777777777777777777777777777',
        secondary: moment('2019-10-09').fromNow(),
      },
      {
        contents:
          '8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888',
        secondary: moment('2019-10-09').fromNow(),
      },
      {
        contents:
          '99999999999999999999999999999999999999999999999999999999999999999999999999999',
        secondary: moment('2019-10-09').fromNow(),
      },
      {
        contents: '10번째 내용',
        secondary: moment('2019-10-09').fromNow(),
      },
      {
        contents: '11번째 내용',
        secondary: moment('2019-10-09').fromNow(),
      },
    ]);
    setNewNote('');
    listScrollTop = 'top';
  }, [curMember]);

  /**
   *  맴버 변경
   */
  const handleChangeMember = selectObj => {
    // setMemberIndex(selectObj.index);
    history.push(`/statistic/${selectObj.label}`);
  };

  /**
   * 메모 삭제 event
   * confirm 기능 추가하기
   */
  const handleDeletNode = index => {
    // 메모 삭제하는 api 호출 후 성공하면
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  /**
   * 메모 추가 input onChange event
   */
  const handleChange = event => {
    setNewNote(event.target.value);
  };

  /**
   * 메모 추가
   */
  const handleAddNote = () => {
    const newNoteObj = {
      text: newNote,
    };
    // 메모 추가하는 api 호출 후 성공하면
    listScrollTop = 'bottom';
    setPosts([
      ...posts,
      {
        contents: newNote,
        secondary: moment().fromNow(),
      },
    ]);
    setNewNote('');
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
          </div>
        </div>
      </Paper>
      <div className={classes.secondColumn}>
        <RadarChart data={data} />
        <RadialBarChart data={ptCountData} className={classes.chart} />
        <div className={classes.boardWrap}>
          <InteractiveList
            list={posts}
            makeAppearBtnLabel="등록일 보기"
            title="메모"
            listMaxHeight={400}
            handleDelete={handleDeletNode}
            // scrollRef={listRef}
            listScrollTop={listScrollTop}
          />
          <div className={classes.addNoteWrap}>
            <TextField
              id="add-note-input"
              label="메모 추가"
              value={newNote}
              className={classes.textField}
              onChange={handleChange}
              margin="normal"
            />
            <Fab
              color="primary"
              aria-label="add"
              className={classes.fab}
              onClick={handleAddNote}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Statistics);
