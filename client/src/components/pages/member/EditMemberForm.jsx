/*
 * 날짜: 2019.08.12
 * 작성자: 박종열
 * 기능: Member(회원)정보 수정
 */

import React, { useContext } from '@babel/corereact';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import DatePicker from './DatePicker';
import Select from './Select';
import { MembersContext } from '../../contexts/members.context';
import useInputState from '../../hooks/useInputState';

function EditMemberForm({ member, toggle, isEditing }) {
  const {
    name,
    phonenum,
    gender,
    startDate,
    endDate,
    totalPT,
    height,
  } = member;
  const editMember = useContext(MembersContext);

  const [newName, handleName] = useInputState(name);
  const [newPhoneNum, handlePhoneNum] = useInputState(phonenum);
  const [newGender, handleGender] = useInputState(gender);
  const [newTotalPT, handleTotalPT] = useInputState(totalPT);
  const [newHeight, handleHeight] = useInputState(height);
  const [newStartDate, setStartDate] = React.useState(
    moment(startDate).format()
  );
  const [newEndDate] = React.useState(moment(endDate).format());

  const handleSubmit = () => {
    editMember(
      newName,
      newPhoneNum,
      newGender,
      newTotalPT,
      newHeight,
      newStartDate,
      newEndDate
    );
    toggle();

    //     fetch("/changeMemberInfo", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             name: newName,
    //             phonenum: newPhoneNum,
    //             gender: newGender,
    //             startDate: newStartDate,
    //             endDate: newEndDate,
    //             totalPT: newTotalPT
    //         })
    //     }).then((res) => {
    //         return res.json()
    //     }).then((result) => {
    //         //console.log("getMemberAndFixedSchedule", expectedMembers);
    //     })
  };

  return (
    <>
      <Dialog
        maxWidth="xs"
        open={isEditing}
        onClose={toggle}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">회원수정</DialogTitle>
        <DialogContent>
          <DialogContentText>회원수정 페이지입니다.</DialogContentText>
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
          <Select
            prevGender={gender}
            newGender={newGender}
            handleGender={handleGender}
          />
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
            id="totalPT"
            value={newTotalPT}
            onChange={handleTotalPT}
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
          <Button onClick={toggle} color="primary">
            닫기
          </Button>
          <Button onClick={handleSubmit} color="primary">
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditMemberForm;
