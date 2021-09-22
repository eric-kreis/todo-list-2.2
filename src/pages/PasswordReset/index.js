import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthHeader from '../../components/AuthHeader';
import EmailInput from '../../components/EmailInput';

import { useAuth } from '../../Contexts/AuthContext';
import { useEmail } from '../../hooks';

import {
  AuthBodyS,
  AuthContainerS,
  AuthFormS,
  LinkContainerS,
  SubmitButtonS,
} from '../../styles/auth';
import ResetLoading from '../../assets/loadingComponents/ResetLoading';

import { validClass } from '../../utils/inputClasses';

export default function PasswordReset() {
  const { resetPassword } = useAuth();
  const [email, emailClass, handleChangeEmail] = useEmail();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    if (email && emailClass === validClass) {
      try {
        setLoading(true);
        setError('');
        setSuccess('');
        await resetPassword(email);
        setSuccess('* Email enviado, verifique sua caixa de entrada!');
      } catch (resetError) {
        switch (resetError.code) {
          case 'auth/user-not-found':
            setError('* Usuário não encontrado');
            break;
          default:
            setError('* Falha ao enviar');
            break;
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = 'Recuperar senha';
  }, []);

  return (
    <AuthBodyS>
      <AuthContainerS defaultH>
        <AuthHeader>RECUPERAR SENHA</AuthHeader>
        { loading ? <ResetLoading />
          : (
            <AuthFormS onSubmit={(e) => e.preventDefault()}>
              { error && <p className="error">{ error }</p> }
              { success && <p className="success">{ success }</p> }
              <div>
                <EmailInput
                  name="login"
                  value={email}
                  className={emailClass}
                  onChange={handleChangeEmail}
                >
                  { emailClass === validClass ? 'E-mail' : 'Digite um e-mail válido' }
                </EmailInput>
              </div>
              <SubmitButtonS
                type="submit"
                onClick={handleSubmit}
                disabled={!email || emailClass !== validClass}
              >
                Enviar
              </SubmitButtonS>
              <LinkContainerS>
                <p>
                  {'Senha alterada? '}
                  <Link to="/login">Entrar</Link>
                </p>
              </LinkContainerS>
            </AuthFormS>
          ) }
      </AuthContainerS>
    </AuthBodyS>
  );
}
