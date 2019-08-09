import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useUpDown from './useUpDown'
import Row from './Row'
import uuid from 'uuid/v4'
import { ExerciseContext }  from '../../contexts/ExerciseContext';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));


export default function MyTable() {
  const classes = useStyles();
  const [selectedExer, setSelectedExer] = useContext(ExerciseContext);
  
  const [name, setName] = useState("")
  const [sets, increaseSets, decreaseSets] = useUpDown(0);
  const [reps, increaseReps, decreaseReps] = useUpDown(0);

  const [myRows, setRows] = useState([{
        name: "22",
        sets: 5,
        reps: 12,
        id: uuid()
  }])
  

  const onSubmit = ( name, sets, reps ) => {
    setRows(currentRows => [...currentRows, { name, sets, reps, id: uuid() }])
}

  const remove = (id) => {
    setRows(currentRows => currentRows.filter(row => row.id !== id))
    fetch("/delete", {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
  }
  

  const Rows = myRows.map(cv => {
    return(<Row name={cv.name} sets={cv.sets} reps={cv.reps} id={cv.id} remove={remove} />)
  })

  const handleChange = (evt) => {
    setSelectedExer(evt.target.value)
  }

  const handleSubmit = () => {
    onSubmit(selectedExer, sets, reps);
  }


  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell >운동명</TableCell>
              <TableCell align="right">세트수</TableCell>
              <TableCell align="right">반복수</TableCell>
              <TableCell align="right">추가</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell ><input type="text" value={selectedExer} onChange={handleChange}></input></TableCell>
              <TableCell align="right"><button onClick={increaseSets}>up</button> {sets} <button onClick={decreaseSets}>down</button></TableCell>
              <TableCell align="right"><button onClick={increaseReps}>up</button> {reps} <button onClick={decreaseReps}>down</button></TableCell>
              <TableCell align="right"><button onClick={handleSubmit}>추가</button> </TableCell>
            </TableRow>
              {Rows}
            {/* {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.sets}</TableCell>
                <TableCell align="right">{row.reps}</TableCell>
                <TableCell align="right"><button onClick={handleDelete}>삭제</button></TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}