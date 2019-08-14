import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useInputState from '../../hooks/useInputState'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(0),
    display: 'inline'
  },
  group: {
    margin: theme.spacing(1, 0),
    display: 'inline'
  },
}));

export default function RadioButtonsGroup({prevGender, newGender, handleGender}) {
  const classes = useStyles();
  console.log("prevGender", prevGender)
  console.log("newGender", newGender)

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          className={classes.group}
          value={newGender}
          onChange={handleGender}
          margin={0}
        >
          <FormControlLabel value={0} checked={newGender == 0} control={<Radio />} label="여성" />
          <FormControlLabel value={1} checked={newGender == 1} control={<Radio />} label="남성" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}