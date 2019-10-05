import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  select: {
    minWidth: '120px',
  },
}));

export default function SimpleSelect({ list, selectName, selectId }) {
  const classes = useStyles();
  const [values, setValues] = React.useState('');

  const handleChange = event => {
    setValues(event.target.value);
  };

  return (
    <>
      {/* <InputLabel htmlFor="age-simple">Age</InputLabel> */}
      <Select
        className={clsx('h-Selects', classes.select)}
        value={values}
        onChange={handleChange}
        inputProps={{
          name: selectName,
          id: selectId,
        }}
      >
        {list.map((item, index) => (
          <MenuItem key={`${index}_${item.value}`} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
