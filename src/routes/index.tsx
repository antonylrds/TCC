import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/SignUp';
import Admin from '../pages/Admin';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/" render={() => <Redirect to="/dashboard" />} exact />
      <Route path="/signUp" component={Signup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route
        path="/admin"
        render={() => (user ? <Admin /> : <Redirect to="/dashboard" />)}
      />
    </Switch>
  );
};

export default Routes;
