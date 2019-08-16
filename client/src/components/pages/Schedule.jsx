import React from 'react'
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from '../Calendar/Calendar';
import Routine from '../routine/Routine';
import RecentWorkOut from '../recentWorkOut/RecentWorkOut'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'. Built with '}
        <Link color="inherit" href="https://material-ui.com/">
          Material-UI.
        </Link>
      </Typography>
    );
  }

const useStyles = makeStyles(theme => ({

fixedHeight: {
    height: 500,
},
}));

function Schedule(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return(
       <>
        <Grid container spacing={0} justify="center">
            <Grid item xs={12} md={8} lg={8}>
                <Calendar />
            </Grid>
        </Grid>
        <Grid container  justify="center">
            <Grid item xs={12} md={8} lg={8}>
                <RecentWorkOut />
            </Grid>
        </Grid>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Routine/>
                </Grid>
            </Grid>
        <Copyright />
       </>
        
    )
}

export default Schedule;
