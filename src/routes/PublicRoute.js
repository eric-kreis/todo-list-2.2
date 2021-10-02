/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, useLocation } from 'react-router-dom';

import { useAuth } from '../Contexts/AuthContext';
import { userData, users } from '../utils/collections';
import { getCurrentTimestamp } from '../firebase';
import { setDocument } from '../helpers/database';
import { saveLogin } from '../helpers';

export default function PublicRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();

  const createUserDocs = () => {
    setDocument({
      collName: users,
      docName: currentUser.uid,
      data: {
        firstEmail: currentUser.email,
        currentEmail: currentUser.email,
        firstLogin: getCurrentTimestamp(),
      },
    });

    setDocument({
      collName: userData,
      docName: currentUser.uid,
      data: {
        tasks: [],
        checkedItems: [],
      },
    });
  };

  const execByPath = () => {
    if (pathname === '/register') createUserDocs();
    saveLogin(currentUser.email);
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return <Component {...props} />;
        }
        execByPath();
        return <Redirect to="/" />;
      }}
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
