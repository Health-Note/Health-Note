import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Grid from '@material-ui/core/Grid';
import MemberList from '../member/MemberList';
import MemberForm from '../member/MemberForm';
import MemberCalendar from '../member/MemberCalendar';
import { MembersProvider } from '../../contexts/members.context';

function Member () {
    // const initialTodos = JSON.parse(window.localStorage.getItem("todos") || "[]");
    // const {todos} = useTodoState(initialTodos);

    // useEffect(() => {
    //     window.localStorage.setItem("todos", JSON.stringify(todos));
    // }, [todos])

    return(
   
          
            <Grid container justify="center" style={{marginTop: "1rem"}}>
                <Grid item xs={12} md={10} lg={7}>
                <MembersProvider>
                    <MemberForm />
                    <MemberList/>
                    <MemberCalendar />
                </MembersProvider>
                </Grid>
            </Grid>
    )
}

export default Member;