import React from "react";

import Grid from "@material-ui/core/Grid";
import MemberJoinForm2 from "../member/MemberJoinForm2";
import MemberTable from "../member/MemberTable";
import MemberCalendar from "../member/MemberCalendar";
import { MembersProvider } from "../../contexts/members.context";

function Member() {
  // const initialTodos = JSON.parse(window.localStorage.getItem("todos") || "[]");
  // const {todos} = useTodoState(initialTodos);

  // useEffect(() => {
  //     window.localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos])

  return (
    <Grid container justify="center" style={{ marginTop: "1rem" }}>
      <Grid item xs={12} md={10} lg={10}>
        <MembersProvider>
          <MemberJoinForm2 />
          <MemberTable />
          <MemberCalendar />
        </MembersProvider>
      </Grid>
    </Grid>
  );
}

export default Member;
