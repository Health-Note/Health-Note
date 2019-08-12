import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import useInputState from '../../hooks/useInputState';
import { DispatchContext } from '../../contexts/members.context';

const MemberForm = ({ addTodo }) => {
    const [value, handleChange, reset] = useInputState("");
    const dispatch = useContext(DispatchContext);
    return ( 
        <form onSubmit={ e => {
            e.preventDefault();
            dispatch({type: "ADD", name: value})
            reset();
        }}
        style={{  }}>
            <Paper style={{margin: '1rem 0', padding: '0 1rem'}}>
                <TextField value={value} onChange={handleChange} margin="normal" label="이름"/>
            </Paper>
        </form>
    )
}

export default MemberForm;
