import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import MemberJoinForm2 from './MemberJoinForm2';
import MemberTable from './MemberTable';
import useToggle from '../../../hooks/useToggle';

function Member() {
  const [isOpen, toggle] = useToggle();

  return (
    <Grid container justify="center" style={{ marginTop: '1rem' }}>
      <Grid item xs={12} md={10} lg={10}>
          {isOpen && <MemberJoinForm2 toggle={toggle} />}
          <MemberTable toggle={toggle} />
      </Grid>
    </Grid>
  );
}

export default Member;
