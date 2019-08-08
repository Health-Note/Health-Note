import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MyTable from './MyTable';
import Form from './Form';
import Grid from '@material-ui/core/Grid'

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

    const [rows, setRows] = useState([{
            name: "jongyeol",
            sets: 5,
            reps: 12,
        }])

    const onSubmit = ( name, sets, reps ) => {
        setRows(currentRows => [...currentRows, { name, sets, reps }])
        console.log(rows)
    }

    return (
        <Grid className={classes.paper} item xs={11} >
            <div  style={{textAlign: "center"}} >
                <Form onSubmit={onSubmit} />
                <MyTable rows={rows} />
            </div>
        </Grid>
    )
}

export default Routine;
