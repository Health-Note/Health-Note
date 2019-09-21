import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { RoutineContext } from '../../contexts/routine.context';
import Chip from './Chip';

export default function RecentWorkOut() {
  const { routineState } = useContext(RoutineContext); //defaultProps를 대체하게 됨
  return (
    <>
      {/* {routineState !== null ? (
          <Grid container justify="center" spacing={1}>
              { routineState.recentWorkOut.map(day => (
            <Grid item>
              <Chip dayRoutines={day.dayRoutines} day={day.day} key={day.day} />
            </Grid>
              )) }
          </Grid>) :
          "주간 루틴 확인을 위해 회원 이름을 클릭하세요"
        } */}
    </>
  );
}
