import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/dashboard" />} exact />
    <Route path="/signUp" component={Signup} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/login" component={Login} />
  </Switch>
);

export default Routes;
