import React, { useContext } from 'react'
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


function Row ({name, reps, sets, id, remove}) {
  
  const handleRemove = () => {
    remove(id)
  }
  
  return (
    <>
    
      <TableRow key={id}>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell align="right">{sets}</TableCell>
        <TableCell align="right">{reps}</TableCell>
        <TableCell align="right"><button onClick={handleRemove}>삭제</button></TableCell>
      </TableRow>
    
    </>
    )
}

export default Row
