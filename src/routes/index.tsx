import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import AppProvder from '../hooks';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <AppProvder>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </AppProvder>
    </Switch>
  </BrowserRouter>
);

export default Routes;
