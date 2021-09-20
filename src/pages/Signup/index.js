import React, { useEffect, useMemo, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

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

import { database } from '../../firebase';
import { saveLogin } from '../../helpers';
import { getDoc, setDoc } from '../../helpers/database';
import { userData, users } from '../../utils/collections';

const validClass = 'form-control';
const invalidClass = 'form-control is-invalid';

export default function Signup() {
  const { signUp, currentUser } = useAuth();

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPassowordValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [emailClass, setEmailClass] = useState(validClass);
  const [passwordClass, setPasswordClass] = useState(validClass);
  const [confirmPasswordClass, setConfirmPasswordClass] = useState(validClass);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const inputClasses = useMemo(() => (
    [emailClass, passwordClass, confirmPasswordClass]
  ), [confirmPasswordClass, emailClass, passwordClass]);

  // Email functions;
  const emailValidation = (value) => {
    const emailPattern = /\S+@\S+\.\S+/;
    if (emailPattern.test(value)) {
      setEmailClass(validClass);
    } else {
      setEmailClass(invalidClass);
    }
  };

  const handleValidateEmail = ({ target: { value } }) => {
    setEmailValue(value);
    emailValidation(value);
  };

  // Password functions;
  const passwordValidation = (value) => {
    if (value.trim() && value.length >= 6) {
      setPasswordClass(validClass);
      if (value === confirmValue) {
        setConfirmPasswordClass(validClass);
      } else if (confirmValue) {
        setConfirmPasswordClass(invalidClass);
      }
    } else {
      setPasswordClass(invalidClass);
    }
  };

  const handleValidatePassword = ({ target: { value } }) => {
    setPassowordValue(value);
    passwordValidation(value);
  };

  // Confirm password functions;
  const confirmValidation = (value) => {
    if (value === passwordValue && value.trim()) {
      setConfirmPasswordClass(validClass);
    } else {
      setConfirmPasswordClass(invalidClass);
    }
  };

  const handleValidateConfirm = ({ target: { value } }) => {
    setConfirmValue(value);
    confirmValidation(value);
  };

  const allValidated = useMemo(() => (
    inputClasses.every((inputClass) => inputClass === validClass)
  ), [inputClasses]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      await signUp(emailValue, passwordValue);
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
    setDoc({
      collName: users,
      docName: currentUser.uid,
      data: {
        firstEmail: emailValue,
        currentEmail: currentUser.email,
        firstLogin: database.getCurrentTimestamp(),
        imagePath: '/',
      },
    });

    setDoc({
      collName: userData,
      docName: currentUser.uid,
      data: {
        currentEmail: currentUser.email,
        tasks: [],
        checkedItems: [],
        lastModification: database.getCurrentTimestamp(),
      },
    });
  };

  if (currentUser) {
    saveLogin(emailValue);

    const doc = getDoc({
      collName: users,
      docName: currentUser.uid,
    });

    if (!doc.exists) createUserDocs();

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
                  value={emailValue}
                  className={emailClass}
                  onChange={handleValidateEmail}
                >
                  { (emailClass === validClass)
                    ? 'E-mail' : 'Digite um e-mail válido' }
                </EmailInput>
                <section>
                  <PasswordInput
                    name="sign-pass"
                    value={passwordValue}
                    className={passwordClass}
                    onChange={handleValidatePassword}
                  >
                    { (passwordClass === 'form-control')
                      ? 'Senha' : 'Mínimo de 6 caracteres' }
                  </PasswordInput>
                  <PasswordInput
                    name="sign-confirm"
                    value={confirmValue}
                    className={confirmPasswordClass}
                    onChange={handleValidateConfirm}
                  >
                    { (confirmPasswordClass === 'form-control')
                      ? 'Confirme sua senha' : 'As senhas não coincidem' }
                  </PasswordInput>
                </section>
              </div>
              <SubmitButtonS
                type="submit"
                onClick={handleSubmit}
                disabled={
                  !emailValue
                  || !passwordValue
                  || !confirmValue
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
