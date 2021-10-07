import React from 'react';
import PropTypes from 'prop-types';
import ProviderButton from './ProviderButton';
import ProviderSectionS from './styles';
import { useAuth } from '../../Contexts/AuthContext';

export default function ProviderSection({ setError }) {
  const { signInWithProvider } = useAuth();

  const handleSignIn = async ({ target: { name } }) => {
    try {
      setError('');
      await signInWithProvider(name);
    } catch (e) {
      switch (e.code) {
        case 'auth/account-exists-with-different-credential':
          setError('* Este e-mail já está em uso');
          break;
        case 'auth/popup-closed-by-user':
          setError('* Operação cancelada pelo usuário');
          break;
        case 'auth/cancelled-popup-request':
          setError('* Operação interrompida');
          break;
        default:
          setError('* Ocorreu um problema, tente novamente mais tarde');
          break;
      }
    }
  };

  return (
    <ProviderSectionS>
      <ProviderButton name="facebook" onClick={handleSignIn} />
      <ProviderButton name="google" onClick={handleSignIn} />
      <ProviderButton name="github" onClick={handleSignIn} />
    </ProviderSectionS>
  );
}

ProviderSection.propTypes = {
  setError: PropTypes.func.isRequired,
};
