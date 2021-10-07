import React from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import * as Pages from '../pages';

export default function Routes() {
  return (
    <Switch>
      <PublicRoute path="/reset-password" component={Pages.PasswordReset} />
      <PublicRoute path="/register" component={Pages.Signup} />
      <PrivateRoute path="/profile" component={Pages.Profile} />
      <PublicRoute path="/login" component={Pages.Login} />
      <PrivateRoute path="/" component={Pages.Home} />
    </Switch>
  );
}
