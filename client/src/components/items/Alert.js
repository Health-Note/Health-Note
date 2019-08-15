import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DispatchContext } from '../../contexts/schedule.context';


export default function AlertDialog({toggle, setToggle, targetId, handleRemove}) {
  const dispatch = useContext(DispatchContext);


  function closeAlert() {
    setToggle();
  }

  function removeSchedule() {
    handleRemove();
    setToggle();
    dispatch({type: "DELETE", id: targetId})
  }
  
  // 회원 가변 스케줄상에서 완료로 바꿈 / 창닫기 / targetId = PhoneNum
  function completeSchedule() {
    setToggle();
    dispatch({type: "TOGGLE", id: targetId}); 
  }


  return (
    <div>
      <Dialog
        open={toggle}
        onClose={setToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAlert} color="primary">
            닫기
          </Button>
          <Button onClick={removeSchedule} color="primary" autoFocus>
            일정 삭제
          </Button>
          <Button onClick={completeSchedule} color="primary" >
            PT 완료
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}