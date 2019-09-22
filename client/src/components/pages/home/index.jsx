import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/auth.context';
import { MembersContext } from '../../../contexts/members.context';

const Home = () => {
  const authContext = useContext(AuthContext);
  const membersContext = useContext(MembersContext);

  useEffect(() => {
    //authContext.loadUser();
    membersContext.getMember();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1> 헬스노트 홈 </h1>
    </div>
  );
};

export default Home;
