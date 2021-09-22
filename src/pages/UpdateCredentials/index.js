import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../Contexts/AuthContext';
import { useDoublePass, useEmail } from '../../hooks';

import PasswordBox from './PasswordBox';
import SelectBox from './SelectBox';
import ButtonContainerS from './styles';

import AuthHeader from '../../components/AuthHeader';
import EmailInput from '../../components/EmailInput';

import {
  AuthBodyS,
  AuthContainerS,
  AuthFormS,
} from '../../styles/auth';

import { updateDoc } from '../../helpers/database';
import { userData, users } from '../../utils/collections';
import { validClass } from '../../utils/inputClasses';

export default function UpdateCredentials() {
  const history = useHistory();
  const { title } = useContext(ThemeContext);
  const { updateEmail, updatePassword, currentUser } = useAuth();
  const [email, emailClass, handleChangeEmail] = useEmail(currentUser.email);
  const {
    password,
    confirm,
    passwordClass,
    confirmClass,
    handleChangePassword,
    handleChangeConfirm,
    resetState,
  } = useDoublePass();

  const [view, setView] = useState('select');

  // Make the toast and update user email;
  const changeEmail = async () => {
    if (emailClass === validClass && email !== currentUser.email) {
      await toast.promise(
        updateEmail(email),
        {
          pending: {
            render() { return 'Alterando email...'; },
            theme: title,
          },
          success: {
            render() { return 'Email atualizado com sucesso!'; },
            theme: title,
          },
          error: {
            render({ data }) {
              switch (data.code) {
                case 'auth/requires-recent-login':
                  return 'Faça login novamente para alterar esta informação';
                case 'auth/email-already-in-use':
                  return 'Falha ao atualizar, este email já está em uso';
                default:
                  return 'Falha ao atualizar o email';
              }
            },
            theme: title,
          },
        },
      );

      setView('select');

      updateDoc({
        collName: users,
        docName: currentUser.uid,
        data: {
          currentEmail: currentUser.email,
        },
      });

      updateDoc({
        collName: userData,
        docName: currentUser.uid,
        data: {
          currentEmail: currentUser.email,
        },
      });
    }
  };

  const changePassword = async () => {
    if (password === confirm) {
      await toast.promise(
        updatePassword(confirm),
        {
          pending: {
            render() { return 'Alterando senha...'; },
            theme: title,
          },
          success: {
            render() { return 'Senha atualizada com sucesso!'; },
            theme: title,
          },
          error: {
            render({ data }) {
              switch (data.code) {
                case 'auth/weak-password':
                  return 'Sua senha deve conter pelo menos 6 caracteres';
                case 'auth/requires-recent-login':
                  return 'Faça login novamente para alterar esta informação';
                default:
                  return 'Falha ao atualizar a senha';
              }
            },
            theme: title,
          },
        },
      );
      setView('select');
      resetState();
    }
  };

  const handleSubmit = () => {
    if (view === 'email') changeEmail();
    if (view === 'password') changePassword();
  };

  const handleReturn = () => {
    if (view === 'email' || view === 'password') setView('select');
    if (view === 'select') history.push('/profile');
  };

  const handleChangeView = ({ target: { value } }) => setView(value);

  useEffect(() => {
    document.title = 'Alterar credenciais';
  }, []);

  return (
    <AuthBodyS>
      <ToastContainer transition={Flip} />
      <AuthContainerS defaultH update>
        <AuthHeader>
          { view === 'select' && 'O que deseja alterar?' }
          { view === 'email' && 'Alterar email' }
          { view === 'password' && 'Alterar senha' }
        </AuthHeader>
        <AuthFormS onSubmit={(e) => e.preventDefault()} update>
          <div>
            { view === 'select' && <SelectBox handleChangeView={handleChangeView} />}

            { view === 'email' && (
              <EmailInput
                name="sign"
                value={email}
                className={emailClass}
                onChange={handleChangeEmail}
              >
                { emailClass === validClass ? 'E-mail' : 'Digite um e-mail válido' }
              </EmailInput>
            ) }

            { view === 'password'
            && (
              <PasswordBox
                password={password}
                confirm={confirm}
                passwordClass={passwordClass}
                confirmClass={confirmClass}
                handleChangePassword={handleChangePassword}
                handleChangeConfirm={handleChangeConfirm}
              />
            ) }

          </div>
          <ButtonContainerS>
            { view !== 'select' && (
              <button
                type="submit"
                className="link"
                onClick={handleSubmit}
                disabled={
                  view === 'email'
                    ? emailClass !== validClass
                    : !password
                      || !confirm
                      || confirmClass !== validClass
                }
              >
                Atualizar
              </button>
            ) }
            <button type="button" className="link last" onClick={handleReturn}>
              Voltar
            </button>
          </ButtonContainerS>
        </AuthFormS>
      </AuthContainerS>
    </AuthBodyS>
  );
}
