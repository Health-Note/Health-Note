import React, { useEffect, useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from './Divider'
import { ExerciseContext }  from '../../contexts/ExerciseContext';
import { idContext }  from '../../contexts/ExerciseContext';
import Grid from '@material-ui/core/Grid';

export default function RecentWorkOut() {

  const { id, date } = useContext(ExerciseContext);
  
  const defaultProps = [ 
      { day: 0, kind: ["펙덱플라이1", "풀업", "러닝", "윗몸일으키기"] },
      { day: 1, kind: ["펙덱플라이2", "풀업", "러닝", "윗몸일으키기"] },
      { day: 2, kind: ["펙덱플라이3", "풀업", "러닝", "윗몸일으키기"] },
      { day: 3, kind: ["펙덱플라이4", "풀업", "러닝", "윗몸일으키기"] },
      { day: 4, kind: ["펙덱플라이5", "풀업", "러닝", "윗몸일으키기"] },
      { day: 5, kind: ["펙덱플라이6", "풀업", "러닝", "윗몸일으키기"] },
      { day: 6, kind: ["펙덱플라이7", "풀업", "러닝", "윗몸일으키기"] }
  ]
  

  /**
   * 날짜: 2019.08.09
   * 작성자: 박종열
   * 기능: Calendar에서 이름 클릭시 ajax (월~일요일 해당회원의 운동루틴 데이저를 가져온다)
           req: id, date
           res: 요일별 운동루틴
  **/
  useEffect(() => {
    console.log("recentworkOut", id)
    fetch("/getWeekRoutineOfStu",{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, today: date})
    })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log("월,화,수,목,금,토,일 운동루틴", result);
    })
  }, [id])
  
  // 예시 json 
  // { 0: { exercise: [펙덱플라이, 풀업, 러닝, 윗몸일으키기] },
  //   1: { exercise: []}, 
  //   2: { exercise: []},
  // }
  return (
    <React.Fragment>
      <CssBaseline />
          <Grid item >
            <Grid
              container
              spacing={3}
              direction="row"
              justify="center"
              alignItems="center"
            >
                  { defaultProps.map(cv => (
                    <Divider className="Divder" exercise={ cv } key={cv.day} />
                )) }
            </Grid>
        </Grid>
    </React.Fragment>
  );
}