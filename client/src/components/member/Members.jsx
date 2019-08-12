import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Grid from '@material-ui/core/Grid';
import MemberList from './MemberList';
import MemberForm from './MemberForm';
import { MembersProvider } from '../../contexts/members.context';

function Member () {
    // const initialTodos = JSON.parse(window.localStorage.getItem("todos") || "[]");
    // const {todos} = useTodoState(initialTodos);

    // useEffect(() => {
    //     window.localStorage.setItem("todos", JSON.stringify(todos));
    // }, [todos])

    return(
        <Paper style={{
                    padding: 0,
                    margin: 0,
                    height: "100vh",
                    backgroundColor:"#fafafa"
                }}
            elevation={0}
        >
            <AppBar color='primary' position='static' style={{ height: "64px" }}>
                <ToolBar>
                    <Typography color='inherit'>맴버관리창</Typography>
                </ToolBar>
            </AppBar>
            <Grid container justify="center" style={{marginTop: "1rem"}}>
                <Grid item xs={12} md={10} lg={8}>
                <MembersProvider>
                    <MemberForm />
                    <MemberList/>
                </MembersProvider>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Member;