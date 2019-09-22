import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import uuid from 'uuid/v4'
import MemberJoinForm2 from './MemberJoinForm2';
import MemberTable from './MemberTable';
import { MembersProvider } from '../../../contexts/members.context';
import { MembersContext } from '../../../contexts/members.context';
import { AlertContext } from '../../../contexts/alert.context';
import useToggle from '../../../hooks/useToggle';

function Member() {
  const [isOpen, toggle] = useToggle();
  const { target, error, clearErrors } = useContext(MembersContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    console.log(target)
    if (target) {
      setAlert(target + '님 추가 완료', 'success', uuid());
    }
  }, [target]);

  useEffect(() => {
    if (error) {
      setAlert(error, 'error', uuid());
      clearErrors();
    }
  }, [error]);

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
