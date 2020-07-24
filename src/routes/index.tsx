import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import AppProvder from '../hooks';
import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Route from './Route';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <AppProvder>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
      </AppProvder>
    </Switch>
  </BrowserRouter>
);

export default Routes;
