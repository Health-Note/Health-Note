import React, { useContext } from 'react';
import useInputState from '../../hooks/useInputState';
import TextField from '@material-ui/core/TextField';
import { DispatchContext } from '../../contexts/members.context';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from './DatePicker';
import Select from './Select';
import moment from 'moment';

function MemberJoinForm({ member, toggleJoin, isJoining }) {

    const dispatch = useContext(DispatchContext);
    const [newName, handleName] = useInputState();
    const [newPhoneNum, handlePhoneNum] = useInputState();
    const [newGender, handleGender] = useInputState(0);
    const [newUnusedpt, handleUnusedpt] = useInputState();
    const [newHeight, handleHeight] = useInputState();
    const [newStartDate, setStartDate] = React.useState(Date.now());
    const [newEndDate, setEndDate] = React.useState(Date.now());
                                                                  
    const handleSubmit = () => {
        dispatch({type: "ADD",  newName, newStartDate, newEndDate, newPhoneNum, newGender, newUnusedpt, newHeight});
        toggleJoin();

        // 맴버 등록 (usedpt는 서버측에서 0으로 설정하면 어떨까?)
        fetch("/insertMember", {
          method: "POST",
          headers: {
              "Content-Type": "application/json" 
          },
          body: JSON.stringify({
              name: newName,
              phonenum: newPhoneNum, 
              gender: newGender, 
              start_date: newStartDate, 
              end_date: newEndDate, 
              unusedpt: newUnusedpt,
              height: newHeight
          })
      }).then((res) => {
          return res.json()
      }).then((result) => {
          //console.log("insertMember", result);
      })
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
              value={newName}
              onChange={handleName}
              margin="normal"
              id="name"
              label="이름"
              type="text"
              fullWidth
            />
              <Select prevGender={0} newGender={newGender} handleGender={handleGender}/>
            <TextField
              id="phonenum"
              value={newPhoneNum}
              onChange={handlePhoneNum}
              margin="normal"
              label="연락처 '-' 없이 입력. ex) 01077778888 "
              type="email"
              fullWidth
            />
            <DatePicker newStartDate={newStartDate} setStartDate={setStartDate} />
            <TextField
              id="usedpt"
              margin="normal"
              label="지난피티수"
              type="email"
              fullWidth
            />
            <TextField
              id="unusedpt"
              value={newUnusedpt}
              onChange={handleUnusedpt}
              margin="normal"
              label="남은피티수"
              type="email"
              fullWidth
            />
            <TextField
              id="height"
              value={newHeight}
              onChange={handleHeight}
              margin="normal"
              label="키"
              type="height"
              fullWidth
            />
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