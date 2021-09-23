import { useState } from 'react';
import { invalidClass, validClass } from '../utils/inputClasses';

export default () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordClass, setPasswordClass] = useState(validClass);
  const [confirmClass, setConfirmClass] = useState(validClass);

  const passwordValidation = (value) => {
    if (value.trim() && value.length >= 6) {
      setPasswordClass(validClass);
      if (value === confirm) {
        setConfirmClass(validClass);
      } else if (confirm) {
        setConfirmClass(invalidClass);
      }
    } else {
      setPasswordClass(invalidClass);
    }
  };

  const confirmValidation = (value) => {
    if (value === password && value.trim()) {
      setConfirmClass(validClass);
    } else {
      setConfirmClass(invalidClass);
    }
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
    passwordValidation(value);
  };

  const handleChangeConfirm = ({ target: { value } }) => {
    setConfirm(value);
    confirmValidation(value);
  };

  const resetState = () => {
    setConfirm('');
    setPassword('');
    setPasswordClass(validClass);
    setConfirmClass(validClass);
  };

  return {
    password,
    confirm,
    passwordClass,
    confirmClass,
    handleChangePassword,
    handleChangeConfirm,
    resetState,
  };
};
