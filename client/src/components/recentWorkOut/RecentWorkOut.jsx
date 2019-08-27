import React, { useContext } from 'react';
import { RoutineContext }  from '../../contexts/routine.context';
import Grid from '@material-ui/core/Grid';
import Chip from './Chip';

export default function RecentWorkOut() {

  const { recentWorkOut } = useContext(RoutineContext); //defaultProps를 대체하게 됨  
  return (
      <>
          {recentWorkOut !== null ? (
          <Grid container justify="center" spacing={1}>
              { recentWorkOut.week.map(day => (
            <Grid item>
              <Chip dayRoutines={day.dayRoutines} day={day.day} key={day.day} />
            </Grid>
              )) }
          </Grid>) :
          "주간 루틴 확인을 위해 회원 이름을 클릭하세요"
        }
      </>
  );
}