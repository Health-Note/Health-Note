import React, { useContext } from "react";
import Schedule from './components/pages/Schedule';
import Statistics from './components/pages/Statistics';
import Members from './components/pages/Members';
import { Switch, Route, Redirect } from "react-router-dom";
import { MembersContext } from './contexts/members.context';

function Routes () {
    const members = useContext(MembersContext);

    function getMember(props) { // 괄호안에 props는 라우터에서 넣어주는 프롭스
        let name = props.match.params.name;// 파라미터를 통해 멤버정보 가져오기
        console.log("이름", name);
        let currentMember = members.find( // 프롭스의 멤버와 파라미터의 멤버를 비교
            member => member.name.toLowerCase() === name.toLowerCase()
            );
            console.log("이름", currentMember);
        return <Statistics {...props} member={currentMember} />;
    }

    return(
        <Switch>
            <Route exact path="/schedule" render={() => <Schedule/>} />
            <Route exact path="/statistic" render={() => <Statistics/>} />
            <Route exact path="/statistic/:name" render={getMember} />
            <Route exact path="/member" render={() => <Members/>} />
            <Redirect to='/' /> { /* 다른경로로 왔을 이경로로 리다이렉트 시켜줌 */ }
            <Route render={() => <h1>404 not found</h1>}/>
        </Switch>
    )
}

export default Routes;