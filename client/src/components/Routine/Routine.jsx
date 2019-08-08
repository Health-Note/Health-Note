import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyTable from './MyTable';
import Form from './Form';
import Grid from '@material-ui/core/Grid'
import uuid from 'uuid/v4'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 800,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
  
const Routine = () => {
    const classes = useStyles(); 

    return (
        <Grid className={classes.paper} item xs={11} >
            <div  style={{textAlign: "center"}} >
                <MyTable />
            </div>
        </Grid>
    )
}

export default Routine;
