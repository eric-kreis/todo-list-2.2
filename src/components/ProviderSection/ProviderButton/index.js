import React from 'react';
import PropTypes from 'prop-types';
import ProviderButtonS from './styles';
import { GitHub, Google } from '../../../assets/icons';

const providerIcons = {
  google: <Google />,
  github: <GitHub />,
};

export default function ProviderButton({ name, onClick }) {
  return (
    <ProviderButtonS type="button" name={name} onClick={onClick}>
      { providerIcons[name] }
    </ProviderButtonS>
  );
}

ProviderButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
