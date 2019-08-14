import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ExerciseContext }  from '../../contexts/ExerciseContext';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function ExerciseButton({ kind, selectButton }) {
  const classes = useStyles();
  const {selectedExer, setSelectedExer} = useContext(ExerciseContext);

const handleSelectButton = () => {
  setSelectedExer(kind)
}
  
  return (
    <div>
      <Button color="primary" onClick={handleSelectButton} className={classes.button}>
        {kind}
      </Button>
      <input
        accept="image/*"
        className={classes.input}
        id="text-button-file"
        multiple
        type="file"
      />
    </div>
  );
}