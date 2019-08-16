import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MembersContext } from '../../contexts/members.context';
import {NavLink} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectMember() {
  const members = useContext(MembersContext);
  const classes = useStyles();
  const [values, setValues] = React.useState({});

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="name-simple">회원</InputLabel>
        <Select
          value={values.name}
          onChange={handleChange}
          inputProps={{
            name: 'name',
            id: 'name-simple',
          }}
        >
          {members.map(cv => {
              
              return <MenuItem value={cv.phonenum}><NavLink exact to={`/statistic/${cv.name}`} key={cv.phonenum}> {cv.name} </NavLink></MenuItem>
          })}
          <MenuItem value={20}>Twenty</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}