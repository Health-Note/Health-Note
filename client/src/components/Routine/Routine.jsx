import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyTable from './MyTable';
import Grid from '@material-ui/core/Grid'
import Tab from './Tab';

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

  

  //const value = useContext(ExerciseContext);
  //console.log(value)

  const classes = useStyles(); 
  
    return (
      <>
        <Grid className={classes.paper} item xs={11} >
          <Tab />
          <div  style={{textAlign: "center"}} >
              <MyTable />
          </div>
        </Grid>
      </>
      )
    }
    

export default Routine;
