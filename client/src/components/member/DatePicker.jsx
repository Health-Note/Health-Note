import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment'


export default function DatePicker({newStartDate, newEndDate, setStartDate, setEndDate}) {

  const [selectedDate, setSelectedDate] = React.useState(newStartDate);
  console.log(newStartDate)

  function handleDateChange(date) {
    setStartDate(date);
  }


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
            fullWidth
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="yyyy/MM/dd"
          value={newStartDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
     
      
       
      </Grid>
    </MuiPickersUtilsProvider>
  );
}