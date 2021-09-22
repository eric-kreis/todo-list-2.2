import { useState } from 'react';
import { validClass, invalidClass } from '../utils/inputClasses';

export default (initialEmail = '') => {
  const [email, setEmail] = useState(initialEmail);
  const [emailClass, setEmailClass] = useState(validClass);

  const emailValidation = (value) => {
    const pattern = /\S+@\S+\.\S+/;
    if (pattern.test(value)) return setEmailClass(validClass);
    return setEmailClass(invalidClass);
  };

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
    emailValidation(value);
  };

  return [email, emailClass, handleChange];
};
