import React, { useEffect, useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from './Divider'
import { ExerciseContext }  from '../../contexts/ExerciseContext';

export default function RecentWorkOut() {

  const { id, date } = useContext(ExerciseContext);


  /**
   * 날짜: 2019.08.09
   * 작성자: 박종열
   * 기능: ajax (월~일요일 해당회원의 운동루틴 데이저를 가져온다)
           req: id, date
           res: 요일별 운동루틴
  **/
  // useEffect(() => {
  //   fetch("/getWeekRoutineOfStu",{
  //     method: "POST",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({id, today: date})
  //   })
  //   .then((res) => {
  //     return res.json();
  //   })
  //   .then((result) => {
  //     console.log("월,화,수,목,금,토,일 운동루틴", result);
  //   })
  // }, [id])


  return (
    <React.Fragment>
      <CssBaseline />
      <Container className="RecentWorkOut" maxWidth="md">
        <Divider className="Divder"/>
        <Divider />
        <Divider />
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />
      </Container>
    </React.Fragment>
  );
}