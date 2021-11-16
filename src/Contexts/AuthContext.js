import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  signOut,
  updateEmail,
  updatePassword,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import PropTypes from 'prop-types';
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signInWithProvider = async (providerName) => {
    const providers = {
      google: new GoogleAuthProvider(),
      github: new GithubAuthProvider(),
    };

    const provider = providers[providerName];
    return signInWithPopup(auth, provider);
  };

  const signUp = (email, password) => (
    createUserWithEmailAndPassword(auth, email, password)
  );

  const login = (email, password) => (
    signInWithEmailAndPassword(auth, email, password)
  );

  const logout = () => signOut(auth);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const emailUpdate = (email) => updateEmail(currentUser, email);

  const passwordUpdate = (password) => updatePassword(currentUser, password);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const contextValue = {
    currentUser,
    login,
    logout,
    signUp,
    emailUpdate,
    resetPassword,
    passwordUpdate,
    setCurrentUser,
    signInWithProvider,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      { !loading && children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
