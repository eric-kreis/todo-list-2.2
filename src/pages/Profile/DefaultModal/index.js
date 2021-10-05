import React from 'react';
import PropTypes from 'prop-types';

import ModalWindowS from '../../../styles/ModalWindowS';
import ModalSectionS, { ButtonContainerS, PhotoSectionS } from './styles';

export default function DefaultModal({
  imageSrc,
  handleSubmit,
  handleReturn,
  children,
}) {
  return (
    <ModalWindowS>
      <ModalSectionS>
        <PhotoSectionS>
          <img src={imageSrc} alt="PrevImg" />
        </PhotoSectionS>
        <ButtonContainerS>
          <button type="button" onClick={handleSubmit}>
            { children }
          </button>
          <button onClick={handleReturn} type="button">Voltar</button>
        </ButtonContainerS>
      </ModalSectionS>
    </ModalWindowS>
  );
}

DefaultModal.defaultProps = {
  imageSrc: '',
};

DefaultModal.propTypes = {
  imageSrc: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
