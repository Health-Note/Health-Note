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

content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
},
container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
},
paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
},
fixedHeight: {
    height: 500,
},
}));

function Schedule(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return(
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={7}>
                        <Calendar />
                    </Grid>
                    <Grid item xs={12} md={4} lg={5}>
                        <Paper className={classes.paper}>
                            <Routine/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <RecentWorkOut />
                    </Grid>
                </Grid>
            </Container>
        <Copyright />
        </main>
    )
}

export default Schedule;
