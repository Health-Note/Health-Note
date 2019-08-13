import React from 'react';
import PieChart from '../statistic/PieChart'
import Paper from '@material-ui/core/paper';
import { makeStyles } from '@material-ui/core/styles';
import { width } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height: "400px",
      width: "400px"
    },
  
  }));

function Statistics() {
    const classes = useStyles();
    return (
        <div style={{height: "300px"}}>
            <Paper className={classes.paper}>
                <PieChart />
            </Paper>
        </div>
        )
}

export default Statistics;