import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../hooks/AuthContext';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <AuthProvider>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </AuthProvider>
    </Switch>
  </BrowserRouter>
);

export default Routes;
