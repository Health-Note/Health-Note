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
  const {selectedExer, setSelectedExer, id, date, startTime} = useContext(ExerciseContext);
  
  const [name, setName] = useState("")
  const [sets, increaseSets, decreaseSets] = useUpDown(0);
  const [reps, increaseReps, decreaseReps] = useUpDown(0);

  const [myRows, setRows] = useState([{
        name: "22",
        sets: 5,
        reps: 12,
        id: uuid()
  }])
  

  // 작성일: 2019.08.09
  // 작성자: 박종열
  // 기능: ajax를 로우 추가할때 마다 서버로 전송
  const onSubmit = ( name, sets, reps ) => {
    setRows(currentRows => [...currentRows, { name, sets, reps, id: uuid() }])

    // fetch("/insertRoutine", {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({memberId: id, exercisename: name, date, sets, reps})
    // })
    // .then((res) => {
    //   return res.json();
    // })
    // .then((result) => {
    //   console.log("운동루틴 추가성공", result);
    // })
}

  // 작성일: 2019.08.09
  // 작성자: 박종열
  // 기능: ajax를 로우 삭제할때 마다 서버로 전송
  const remove = (id) => {
    setRows(currentRows => currentRows.filter(row => row.id !== id))
    // fetch("/deleteRoutinebyExercise", {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({memberId, exercisename: name, date})
    // })
  }
  

  const Rows = myRows.map(cv => {
    return(<Row name={cv.name} sets={cv.sets} reps={cv.reps} id={cv.id} remove={remove} key={cv.id} />)
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
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}