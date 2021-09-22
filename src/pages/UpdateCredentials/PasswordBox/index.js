/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import PasswordInput from '../../../components/PasswordInput';

export default function PassowrdBox({
  password,
  confirm,
  passwordClass,
  confirmClass,
  handleChangePassword,
  handleChangeConfirm,
}) {
  return (
    <section>
      <PasswordInput
        name="sign-pass"
        value={password}
        className={passwordClass}
        onChange={handleChangePassword}
      >
        { (passwordClass === 'form-control')
          ? 'Senha'
          : 'Digite uma senha válida' }
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
  );
}

PassowrdBox.propTypes = {
  password: PropTypes.string.isRequired,
  confirm: PropTypes.string.isRequired,
  passwordClass: PropTypes.string.isRequired,
  confirmClass: PropTypes.string.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleChangeConfirm: PropTypes.func.isRequired,
};
