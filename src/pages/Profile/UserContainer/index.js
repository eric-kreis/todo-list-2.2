import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  FileUpload,
  Gallery,
  Gear,
  Trash,
} from '../../../assets/icons';
import UserContainerS, {
  PhotoContainerS,
  ButtonContainerS,
  FileLabelS,
  UserButtonS,
} from './styles';

import { usePhoto } from '../../../Contexts/PhotoContext';

export default function UserContainer({ handleChangeFile, setOpenDefaultModal, setOpenPetModal }) {
  const { image, loading } = usePhoto();
  const history = useHistory();

  return (
    <UserContainerS>
      <PhotoContainerS>
        {!loading && <img src={image} alt="Perfil" />}
      </PhotoContainerS>
      <ButtonContainerS>
        <FileLabelS htmlFor="img-input">
          <FileUpload title="Selecionar arquivo" />
          <input
            id="img-input"
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg"
          />
        </FileLabelS>
        <UserButtonS
          type="button"
          onClick={() => setOpenDefaultModal('delete')}
          title="Excluir foto"
          deleteBtn
        >
          <Trash />
        </UserButtonS>
        <UserButtonS
          type="button"
          onClick={() => setOpenPetModal(true)}
          title="Abrir galeria"
          gallery
        >
          <Gallery />
        </UserButtonS>
        <UserButtonS
          type="button"
          onClick={() => history.push('/update-credentials')}
          title="Alterar credenciais"
        >
          <Gear />
        </UserButtonS>
      </ButtonContainerS>
    </UserContainerS>
  );
}

UserContainer.propTypes = {
  handleChangeFile: PropTypes.func.isRequired,
  setOpenDefaultModal: PropTypes.func.isRequired,
  setOpenPetModal: PropTypes.func.isRequired,
};
