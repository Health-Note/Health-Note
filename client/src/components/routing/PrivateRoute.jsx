import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  // console.log(rest);      react-router-dom 자체 프롭스 (location 등)
  // console.log(Component); 인증되있을시 보여줄 컴포넌트
  return (
    <Route
      {...rest}
      render={props => // 프롭스 전체
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;