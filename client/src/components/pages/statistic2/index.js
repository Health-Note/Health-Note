import React from 'react';
import {useSelector} from "react-redux";

const Statistics = ({member: curMember, history}) => {
    const { members } = useSelector(state => state.member);
    console.log('curMember', curMember);
    if (typeof curMember === 'undefined') {
        curMember = members[0];
    }

    return (
        <>
        <h1>{curMember.memberName}</h1>
        </>
    )
}

export default Statistics;
