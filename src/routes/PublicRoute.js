/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import { saveLogin } from '../helpers';

export default function PublicRoute({ component: Component, path }) {
  const { currentUser } = useAuth();

  return (
    <Route
      path={path}
      render={(props) => {
        if (!currentUser) {
          return <Component {...props} />;
        }
        if (path.includes('login') || path.includes('register')) saveLogin(currentUser.email);
        return <Redirect to="/" />;
      }}
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};
