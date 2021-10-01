import React, { useState, useMemo, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useAuth } from '../../Contexts/AuthContext';

import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';
import {
  AuthBodyS,
  AuthContainerS,
  AuthFormS,
  LinkContainerS,
  SubmitButtonS,
} from '../../styles/auth';
import AuthHeader from '../../components/AuthHeader';
import LoginLoading from '../../assets/loadingComponents/LoginLoading';

import { saveLogin } from '../../helpers';
import { validClass } from '../../utils/inputClasses';
import { useEmail, usePassword } from '../../hooks';

export default function Login() {
  const { login, currentUser } = useAuth();

  const [email, emailClass, handleChangeEmail] = useEmail();
  const [password, passwordClass, handleChangePassword] = usePassword();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allValidated = useMemo(() => (
    [emailClass, passwordClass]
      .every((inputClass) => inputClass === validClass)
  ), [emailClass, passwordClass]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      await login(email, password);
    } catch (loginError) {
      switch (loginError.code) {
        case 'auth/wrong-password':
          setError('* Senha incorreta');
          break;
        case 'auth/too-many-requests':
          setError('* Muitas tentativas, conta desativada temporariamente');
          break;
        case 'auth/user-not-found':
          setError('* E-mail inválido');
          break;
        default:
          setError('* Falha ao entrar');
          break;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Entrar';
  }, []);

  if (currentUser) {
    saveLogin(email);
    return <Redirect to="/" />;
  }

  return (
    <AuthBodyS>
      <AuthContainerS>
        <AuthHeader>ENTRAR</AuthHeader>
        { loading ? <LoginLoading />
          : (
            <AuthFormS onSubmit={(e) => e.preventDefault()}>
              { error && <p className="error">{ error }</p> }
              <div>
                <EmailInput
                  name="login"
                  value={email}
                  className={emailClass}
                  onChange={handleChangeEmail}
                >
                  { emailClass === validClass ? 'E-mail' : 'Digite um e-mail válido' }
                </EmailInput>
                <PasswordInput
                  name="login"
                  value={password}
                  className={passwordClass}
                  onChange={handleChangePassword}
                >
                  { passwordClass === validClass ? 'Senha' : 'Digite uma senha válida' }
                </PasswordInput>
              </div>
              <SubmitButtonS
                type="submit"
                onClick={handleSubmit}
                disabled={!email || !password || !allValidated}
              >
                Entrar
              </SubmitButtonS>
              <LinkContainerS>
                <Link to="/reset-password">Esqueceu a senha?</Link>
                <p>
                  {'Não tem uma conta? '}
                  <Link to="/register">Cadastre-se</Link>
                </p>
              </LinkContainerS>
            </AuthFormS>
          ) }
      </AuthContainerS>
    </AuthBodyS>
  );
}
