import React from "react";
import Grid from "@material-ui/core/Grid";
import MemberJoinForm2 from "../member/MemberJoinForm2";
import MemberTable from "../member/MemberTable";
import MemberCalendar from "../member/MemberCalendar";
import { MembersProvider } from "../../contexts/members.context";
import useToggle from "../../hooks/useToggle";

function Member() {
  const [isOpen, toggle] = useToggle();

  return (
    <Grid container justify="center" style={{ marginTop: "1rem" }}>
      <Grid item xs={12} md={10} lg={10}>
        <MembersProvider>
          {isOpen && <MemberJoinForm2 toggle={toggle} />}
          <MemberTable toggle={toggle} />
          <MemberCalendar />
        </MembersProvider>
      </Grid>
    </Grid>
  );
}

export default Member;
