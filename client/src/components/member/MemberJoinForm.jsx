import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Typography } from 'antd';
import moment from 'moment';
import Select from './Select';
import DaySelect from './DaySelect';
import DatePicker from './DatePicker';
import useInputState from '../../hooks/useInputState';
import { MembersContext } from '../../contexts/members.context';
import { ScheduleContext } from '../../contexts/schedule.context';

function MemberJoinForm({ member, toggleJoin, isJoining }) {
  
    const { addMember, members } = useContext(MembersContext);
    const { setSchedule } = useContext(ScheduleContext);
  
    const [name, handleName] = useInputState();
    const [phonenum, handlePhoneNum] = useInputState();
    const [gender, handleGender] = useInputState(0);
    const [unusedpt, handleUnusedpt] = useInputState();
    const [height, handleHeight] = useInputState();
    const [start_date, setStartDate] = useState(Date.now());
    const [end_date, setEndDate] = useState(Date.now());
    const [days, setDays] = useState([]);
    
    const { Text } = Typography;
    
    const handleSubmit = () => {
      addMember({ 
        name,
        phonenum,
        gender,
        unusedpt, 
        height, 
        start_date: moment(start_date).format("YYYY-MM-DD"), 
        end_date: moment(end_date).format("YYYY-MM-DD"), 
      });

      setTimeout(()=>{
        setSchedule({ unusedpt, start_date, days, phonenum });
      }, 2000)
      
      toggleJoin();
    }
        
    return (
        <>
        <Dialog maxWidth ="xs" open={isJoining} onClose={toggleJoin} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">PT 회원 추가</DialogTitle>
          <DialogContent >
            <DialogContentText>
              PT 회원 추가 페이지입니다.
            </DialogContentText>
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
              <Select prevGender={0} newGender={gender} handleGender={handleGender}/>
            <TextField
              id="phonenum"
              value={phonenum}
              onChange={handlePhoneNum}
              margin="normal"
              label="연락처 '-' 없이 입력. ex) 01077778888 "
              type="email"
              fullWidth
            />
            <DatePicker start_date={start_date} end_date={end_date} setStartDate={setStartDate} setEndDate={setEndDate}/>
            <TextField
              id="unusedpt"
              value={unusedpt}
              onChange={handleUnusedpt}
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
          <DaySelect setDays={setDays}/>
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
    )
}

export default MemberJoinForm;