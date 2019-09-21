import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'center',
    textAlign: 'start',
  },
  chip: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
  },
  day: {
    padding: theme.spacing(1),
    display: 'inline',
  },
}));

export default function SmallChips({ dayRoutines, day }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.day}>
        {day === 0 && '월요일'}
        {day === 1 && '화요일'}
        {day === 2 && '수요일'}
        {day === 3 && '목요일'}
        {day === 4 && '금요일'}
        {day === 5 && '토요일'}
        {day === 6 && '일요일'}
      </div>
      <Paper>
        {dayRoutines.map(cv => (
          <Grid container justify="center" direction="column">
            <Grid item>
              <Chip
                size="small"
                avatar={<Avatar>MB</Avatar>}
                label={cv}
                className={classes.chip}
              />
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
}
