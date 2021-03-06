/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

export default function PrivateRoute({ component: Component, path }) {
  const { currentUser } = useAuth();

  return (
    <Route
      path={path}
      render={(props) => (
        currentUser
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};
