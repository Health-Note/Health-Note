import React, { useContext } from 'react';
import Schedule from '../pages/schedule';
import Statistics from '../pages/statistic';
import Members from '../pages/member';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from '../pages/home';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MembersContext } from '../../contexts/members.context';
// import PrivateRoute from './components/routing/PrivateRoute';

function Routes() {
  const { members } = useContext(MembersContext);
  function getMember(props) {
    // 괄호안에 props는 라우터에서 넣어주는 프롭스
    const name = props.match.params.name; // 파라미터를 통해 멤버정보 가져오기
    const currentMember = members.find(
      // 프롭스의 멤버와 파라미터의 멤버를 비교
      member => member.name && member.name.toLowerCase() === name.toLowerCase()
    );
    return <Statistics {...props} member={currentMember} />;
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/schedule" component={Schedule} />
      <Route exact path="/statistic" render={() => <Statistics />} />
      {/* <Redirect from="/statistic" to={`/statistic/${members[0].name}`} /> */}
      <Route exact path="/statistic/:name" render={getMember} />
      <Route exact path="/member" render={() => <Members />} />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/register" render={() => <Register />} />
      <Redirect to="/" /> {/* 다른경로로 왔을 이경로로 리다이렉트 시켜줌 */}
      <Route render={() => <h1>404 not found</h1>} />
    </Switch>
  );
}

export default Routes;
