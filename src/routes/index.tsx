import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/signUp" component={Signup} />
    <Route path="/dashboard" component={Dashboard} />
  </Switch>
);

export default Routes;
