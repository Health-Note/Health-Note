import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    textAlign: "center"
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

export default function SmallChips({dayRoutines, day}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper>
            {day === 0 && "월요일"}
            {day === 1 && "화요일"}
            {day === 2 && "수요일"}
            {day === 3 && "목요일"}
            {day === 4 && "금요일"}
            {day === 5 && "토요일"}
            {day === 6 && "일요일"}
        
            {dayRoutines.map(cv => (
                <Grid item>
                    <Chip
                    size="small"
                    avatar={<Avatar>MB</Avatar>}
                    label={cv}
                    className={classes.chip}
                    />
                </Grid>
                ))}
        </Paper>
   
    </div>
  );
}
