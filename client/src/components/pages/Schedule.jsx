import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from '../Calendar/Calendar';
import Routine from '../routine/Routine';
import RecentWorkOut from '../recentWorkOut/RecentWorkOut';
import { RoutineProvider } from '../../contexts/routine.context';
import { MembersContext } from '../../contexts/members.context';

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
  const { getMember } = useContext(MembersContext);
  const classes = useStyles();
  
  useEffect(() => {
    getMember();
  }, []);

    return(
       <>
        <RoutineProvider>
          <Grid container spacing={0} justify="center">
              <Grid item xs={5} md={5} lg={9}>
                  <Calendar />
              </Grid>
          </Grid>
          <Grid container justify="center">
              <Grid item xs={12} md={12} lg={12}>
                  <Routine/>
               
              </Grid>
          </Grid>
          <Grid container justify="center">
              <Grid item xs={8} lg={12}>
             
                  <RecentWorkOut />
              </Grid>
          </Grid>
          <Copyright />
        </RoutineProvider>
       </>
    )
}

export default Schedule;
