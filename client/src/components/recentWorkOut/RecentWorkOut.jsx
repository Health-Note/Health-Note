import React, { useEffect, useContext } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from './Divider';
import { ExerciseContext }  from '../../contexts/ExerciseContext';
import { RoutineContext }  from '../../contexts/routine.context';
import Grid from '@material-ui/core/Grid';
import Chip from './Chip';

export default function RecentWorkOut() {

  const { id, date } = useContext(ExerciseContext);
  const routine = useContext(RoutineContext); //defaultProps를 대체하게 됨  
  return (
    <React.Fragment>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            { routine.week.map(day => (
              <Chip dayRoutines={day.dayRoutines} day={day.day} key={day.day} />
            )) }
        </Grid>
    </React.Fragment>
  );
}