import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/auth.context';

const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1> 헬스노트 홈 </h1>
        </div>
    )
}

export default Home;
