import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export default function DatePicker({newStartDate, newEndDate, setStartDate, setEndDate}) {

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  function handleEndDateChange(date) {
    setEndDate(date);
  }


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
            fullWidth
          margin="normal"
          id="date-picker-startDate"
          label="회원권 시작일"
          format="yyyy/MM/dd"
          value={newStartDate}
          onChange={handleStartDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         <KeyboardDatePicker
            fullWidth
          margin="normal"
          id="date-picker-endDate"
          label="회원권 종료일"
          format="yyyy/MM/dd"
          value={newEndDate}
          onChange={handleEndDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
     
      
       
      </Grid>
    </MuiPickersUtilsProvider>
  );
}