import React, { useState } from 'react';
import { DatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 73,
  },
}));

const RangeMonthPicker = ({
  startDate = new Date(),
  endDate = new Date(),
  onChange = f => f,
}) => {
  const classes = useStyles();
  // const [selectedDate, setSelectedDate] = useState({ startDate, endDate });

  const handleDateChange = name => date => {
    // setSelectedDate({ ...selectedDate, [name]: date });
    onChange({ name, value: date });
  };

  return (
    <>
      <DatePicker
        classes={{ root: classes.root }}
        disableFuture
        openTo="year"
        format="MM/yyyy"
        // label="날짜"
        views={['year', 'month']}
        // value={selectedDate.startDate}
        value={startDate}
        name="startDate"
        onChange={handleDateChange('startDate')}
      />
      ~
      <DatePicker
        classes={{ root: classes.root }}
        disableFuture
        openTo="year"
        format="MM/yyyy"
        // label="날짜"
        views={['year', 'month']}
        // value={selectedDate.endDate}
        value={endDate}
        name="endDate"
        onChange={handleDateChange('endDate')}
      />
    </>
  );
};

export default RangeMonthPicker;
