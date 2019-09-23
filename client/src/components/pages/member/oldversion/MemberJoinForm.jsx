import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Typography, TimePicker } from 'antd';
import moment from 'moment';

import Select from './Select';
import DaySelect from './CheckBox';
import DatePicker from './DatePicker';
import useInputState from '../../hooks/useInputState';
import { MembersContext } from '../../contexts/members.context';
import { ScheduleContext } from '../../contexts/schedule.context';
import { AlertContext } from '../../contexts/alert.context';

function MemberJoinForm({ member, toggleJoin, isJoining }) {
  const { addMember, error } = useContext(MembersContext);
  const { setSchedule } = useContext(ScheduleContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [name, handleName] = useInputState();
  const [phonenum, handlePhoneNum] = useInputState();
  const [gender, handleGender] = useInputState(0);
  const [totalPT, handleTotalPT] = useInputState();
  const [height, handleHeight] = useInputState();
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [days, setDays] = useState([]);

  const { Text } = Typography;
  const format = 'HH:mm';

  const handleSubmit = () => {
    console.log('startDate', startDate);
    if (
      name &&
      phonenum &&
      gender &&
      totalPT &&
      height &&
      startDate &&
      endDate &&
      days
    ) {
      const addResult = addMember({
        name,
        phonenum,
        gender,
        totalPT,
        height,
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD'),
      });
      console.log('addResult', addResult);

      if (addResult) {
        setTimeout(() => {
          setSchedule({ totalPT, startDate, days, phonenum });
        }, 2000);
      }
    } else {
      setAlert('모든 항목을 다 채우세요', 'error');
    }
    toggleJoin();
  };

  return (
    <>
      <Dialog
        maxWidth="xs"
        open={isJoining}
        onClose={toggleJoin}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">PT 회원 추가</DialogTitle>
        <DialogContent>
          <DialogContentText>PT 회원 추가 페이지입니다.</DialogContentText>
          <TextField
            autoFocus
            value={name}
            onChange={handleName}
            margin="normal"
            id="name"
            label="이름"
            type="text"
            fullWidth
          />
          <Select
            prevGender={0}
            newGender={gender}
            handleGender={handleGender}
          />
          <TextField
            id="phonenum"
            value={phonenum}
            onChange={handlePhoneNum}
            margin="normal"
            label="연락처 '-' 없이 입력. ex) 01077778888 "
            type="email"
            fullWidth
          />

          <DatePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <TextField
            id="totalPT"
            value={totalPT}
            onChange={handleTotalPT}
            margin="normal"
            label="결제피티수"
            type="email"
            fullWidth
          />
          <TextField
            id="height"
            value={height}
            onChange={handleHeight}
            margin="normal"
            label="키"
            type="height"
            fullWidth
          />
          <br />
          <br />
          <Text type="secondary">PT요일</Text>
          <DaySelect setDays={setDays} />
          <TimePicker defaultValue={moment('12:08', format)} format={format} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleJoin} color="primary">
            닫기
          </Button>
          <Button onClick={handleSubmit} color="primary">
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MemberJoinForm;
