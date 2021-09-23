import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../Contexts/AuthContext';
import { usePhoto } from '../../Contexts/PhotoContext';

import ProfileBodyS, { LogoutContainerS, ProfileMainS } from './styles';

import EmailsContainer from './EmailsContainer';
import PetModal from './PetModal';
import DefaultModal from './DefaultModal';
import UserContainer from './UserContainer';

import { Logout } from '../../assets/icons';
import dogs from '../../assets/dogs';
import cats from '../../assets/cats';

export default function Profile() {
  const { logout } = useAuth();
  const {
    image,
    error,
    handleUpload,
    handleDelete,
  } = usePhoto();
  const { title } = useContext(ThemeContext);

  const [pets, setPets] = useState('');
  const [openDefaultModal, setOpenDefaultModal] = useState('');
  const [openPetModal, setOpenPetModal] = useState(false);
  const [prevImg, setPrevImg] = useState(null);
  const [customImg, setCustomImg] = useState({
    type: '',
    name: '',
  });

  const handleChangeFile = ({ target }) => {
    const file = target.files[0];
    if (file) {
      setCustomImg(file);
      setOpenDefaultModal('send');

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => setPrevImg(e.target.result);
    }
  };

  const handleSelectPet = async (img) => {
    const imageFetch = await fetch(img);
    const myBlob = await imageFetch.blob();
    myBlob.name = 'pet.png';
    myBlob.lastModified = new Date();

    const myFile = new File([myBlob], 'pet.png', {
      type: myBlob.type,
    });

    setOpenPetModal(false);
    setPrevImg(img);
    setCustomImg(myFile);
    setOpenDefaultModal('send');
    setPets('');
  };

  const handleChangeImg = () => {
    setOpenDefaultModal('');
    if (openDefaultModal === 'send') handleUpload(customImg);
    if (openDefaultModal === 'delete') handleDelete();
  };

  const handleDefaultReturn = () => {
    const isDog = dogs.includes(prevImg);
    const isCat = cats.includes(prevImg);

    if (openDefaultModal === 'send' && (isDog || isCat)) {
      setPets(isDog ? 'dog' : 'cat');
      setOpenPetModal(true);
    }
    setOpenDefaultModal('');
  };

  if (error) {
    toast.error(error, {
      theme: title,
      toastId: 'error-toast',
    });
  }

  useEffect(() => {
    document.title = 'Perfil';
  }, []);

  return (
    <ProfileBodyS>
      <ToastContainer transition={Flip} />
      { openDefaultModal && (
        <DefaultModal
          imageSrc={openDefaultModal === 'send' ? prevImg : image}
          handleSubmit={handleChangeImg}
          handleReturn={handleDefaultReturn}
        >
          { openDefaultModal === 'send' ? 'Enviar' : 'Excluir'}
        </DefaultModal>
      ) }
      { openPetModal && (
        <PetModal
          pets={pets}
          setPets={setPets}
          handleSelectPet={handleSelectPet}
          setOpenPetModal={setOpenPetModal}
        />
      ) }
      <ProfileMainS>
        <UserContainer
          handleChangeFile={handleChangeFile}
          setOpenDefaultModal={setOpenDefaultModal}
          setOpenPetModal={setOpenPetModal}
        />
        <EmailsContainer />
        <div>
          <Link to="/" className="link last">Voltar</Link>
          <LogoutContainerS>
            <button type="button" onClick={logout}>
              <Logout title="Finalizar sessão" />
            </button>
          </LogoutContainerS>
        </div>
      </ProfileMainS>
    </ProfileBodyS>
  );
}
