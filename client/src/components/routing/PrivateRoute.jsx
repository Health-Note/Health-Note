import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { error, clearErrors, isAuthenticated, trainer, loading } = useSelector((state) => state.auth);
  // console.log(rest);      react-router-dom 자체 프롭스 (location 등)
  // console.log(Component); 인증되있을시 보여줄 컴포넌트
  return (
    <Route {...rest} render={(props) =>
      !isAuthenticated ?
        (<Redirect to="/login" />) :
        (<Component {...props} />)
    }/>
  );
};

export default PrivateRoute;
