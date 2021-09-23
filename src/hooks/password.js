import { useState } from 'react';
import { invalidClass, validClass } from '../utils/inputClasses';

export default () => {
  const [password, setPassword] = useState('');
  const [passwordClass, setPasswordClass] = useState(validClass);

  const passwordValidation = (value) => {
    if (value.trim()) return setPasswordClass(validClass);
    return setPasswordClass(invalidClass);
  };

  const handleChange = ({ target: { value } }) => {
    setPassword(value);
    passwordValidation(value);
  };

  return [password, passwordClass, handleChange];
};
