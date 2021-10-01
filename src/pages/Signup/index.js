import React, { useEffect, useMemo, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useDoublePass, useEmail } from '../../hooks';
import { useAuth } from '../../Contexts/AuthContext';
import AuthHeader from '../../components/AuthHeader';
import EmailInput from '../../components/EmailInput';
import PasswordInput from '../../components/PasswordInput';

import {
  AuthBodyS,
  AuthContainerS,
  AuthFormS,
  LinkContainerS,
  SubmitButtonS,
} from '../../styles/auth';
import SignupLoading from '../../assets/loadingComponents/SignupLoading';

import { getCurrentTimestamp } from '../../firebase';
import { saveLogin } from '../../helpers';
import { setDocument } from '../../helpers/database';
import { userData, users } from '../../utils/collections';

import { validClass } from '../../utils/inputClasses';

export default function Signup() {
  const { signUp, currentUser } = useAuth();
  const [email, emailClass, handleChangeEmail] = useEmail();
  const {
    password,
    confirm,
    passwordClass,
    confirmClass,
    handleChangePassword,
    handleChangeConfirm,
  } = useDoublePass();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allValidated = useMemo(() => (
    [emailClass, passwordClass, confirmClass]
      .every((inputClass) => inputClass === validClass)
  ), [emailClass, passwordClass, confirmClass]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      await signUp(email, password);
    } catch (signError) {
      switch (signError.code) {
        case 'auth/email-already-in-use':
          setError('* O e-mail fornecido já está em uso');
          break;
        case 'auth/weak-password':
          setError('* A senha deve conter no mínimo 6 caracteres');
          break;
        default:
          setError('* Falha ao criar a conta');
          break;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Cadastre-se';
  }, []);

  const createUserDocs = () => {
    setDocument({
      collName: users,
      docName: currentUser.uid,
      data: {
        firstEmail: email,
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
        currentEmail: currentUser.email,
        lastModification: getCurrentTimestamp(),
      },
    });
  };

  if (currentUser) {
    saveLogin(email);
    createUserDocs();

    return <Redirect to="/" />;
  }
  return (
    <AuthBodyS>
      <AuthContainerS>
        <AuthHeader>CRIE SUA CONTA</AuthHeader>
        { loading ? <SignupLoading />
          : (
            <AuthFormS onSubmit={(e) => e.preventDefault()} signup>
              { error && <p className="error">{ error }</p> }
              <div>
                <EmailInput
                  name="sign"
                  value={email}
                  className={emailClass}
                  onChange={handleChangeEmail}
                >
                  { (emailClass === validClass)
                    ? 'E-mail' : 'Digite um e-mail válido' }
                </EmailInput>
                <section>
                  <PasswordInput
                    name="sign-pass"
                    value={password}
                    className={passwordClass}
                    onChange={handleChangePassword}
                  >
                    { (passwordClass === 'form-control')
                      ? 'Senha' : 'Mínimo de 6 caracteres' }
                  </PasswordInput>
                  <PasswordInput
                    name="sign-confirm"
                    value={confirm}
                    className={confirmClass}
                    onChange={handleChangeConfirm}
                  >
                    { (confirmClass === 'form-control')
                      ? 'Confirme sua senha' : 'As senhas não coincidem' }
                  </PasswordInput>
                </section>
              </div>
              <SubmitButtonS
                type="submit"
                onClick={handleSubmit}
                disabled={
                  !email
                  || !password
                  || !confirm
                  || !allValidated
                }
              >
                Cadastre-se
              </SubmitButtonS>
              <LinkContainerS signup>
                {'Já tem uma conta? '}
                <Link to="/login">Entrar</Link>
              </LinkContainerS>
            </AuthFormS>
          ) }
      </AuthContainerS>
    </AuthBodyS>
  );
}
