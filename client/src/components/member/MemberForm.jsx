import React from 'react';
import MemberJoinForm from './MemberJoinForm'
import useToggle from '../../hooks/useToggle';
import Icon from '@material-ui/core/Icon';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const MemberForm = () => {
    const classes = useStyles();
    const [isJoining, toggleJoin] = useToggle(false); 
    
    return ( 
        <>
            <Fab color="primary" aria-label="add" size="small" className={classes.fab}>
                <AddIcon onClick={toggleJoin} />
            </Fab>
                {isJoining && <MemberJoinForm isJoining={isJoining} toggleJoin={toggleJoin}/>}
        </>
    )
}

export default MemberForm;
