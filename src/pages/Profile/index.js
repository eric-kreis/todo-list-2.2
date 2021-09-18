import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../Contexts/AuthContext';
import { usePhoto } from '../../Contexts/PhotoContext';

import ModalWindowS from '../../styles/ModalWindowS';
import ProfileBodyS, { ModalSectionS } from './styles';

import EmailsContainer from './EmailsContainer';
import Settings from './Settings';
import { Logout } from '../../assets/icons';

import PetModal from './PetModal';

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

  const handleModalClick = () => {
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
        <ModalWindowS>
          <ModalSectionS>
            <section className="photo-container">
              <img src={openDefaultModal === 'send' ? prevImg : image} alt="PrevImg" />
            </section>
            <section className="modal-buttons-container">
              <button type="button" onClick={handleModalClick}>
                { openDefaultModal === 'send' ? 'Enviar' : 'Excluir'}
              </button>
              <button onClick={handleDefaultReturn} type="button">Voltar</button>
            </section>
          </ModalSectionS>
        </ModalWindowS>
      )}
      { openPetModal && (
        <PetModal
          pets={pets}
          setPets={setPets}
          handleSelectPet={handleSelectPet}
          setOpenPetModal={setOpenPetModal}
        />
      ) }
      <section className="profile-container">
        <Settings
          handleChangeFile={handleChangeFile}
          setOpenDefaultModal={setOpenDefaultModal}
          setOpenPetModal={setOpenPetModal}
        />
        <EmailsContainer />
        <div>
          <Link to="/" className="link last">Voltar</Link>
          <div className="logout-container">
            <button type="button" onClick={logout}>
              <Logout title="Finalizar sessão" />
            </button>
          </div>
        </div>
      </section>
    </ProfileBodyS>
  );
}
