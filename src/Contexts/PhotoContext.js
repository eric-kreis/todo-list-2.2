import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
import { getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from './AuthContext';

import { updatePhoto } from '../helpers/auth';
import { sendImg } from '../helpers/storage';

import defaultImage from '../assets/default-profile.png';

const PhotoContext = createContext();

export const usePhoto = () => useContext(PhotoContext);

export default function PhotoProvider({ children }) {
  const { title } = useContext(ThemeContext);
  const { currentUser } = useAuth();

  const [image, setImage] = useState(defaultImage);
  const [loading, setLoading] = useState(true);

  const resetState = () => {
    setImage(defaultImage);
    setLoading(true);
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.photoURL) setImage(currentUser.photoURL);
      setLoading(false);
    } else {
      resetState();
    }
  }, [currentUser]);

  // State observer;
  useEffect(() => {
    if (currentUser && image !== defaultImage) {
      (async () => {
        try {
          await updatePhoto({ currentUser, photoURL: image });
        } catch (e) {
          toast.error('Falha ao salvar o endereço de sua imagem :(');
        }
      })();
    }
  }, [currentUser, image]);

  const handleUpload = async (customImg) => {
    if (customImg.type) {
      setLoading(true);
      const spacelessName = customImg.name.split(' ').join('');

      const toastId = uuidv4();

      const uploadTask = sendImg({
        userId: currentUser.uid,
        customImg,
        imagePath: spacelessName,
      });

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (snapshot.state === 'running') {
            toast.loading('Processando...', { toastId });
          }
        },
        () => {
          toast.update(
            toastId,
            {
              render: 'Ocorreu um erro ao enviar sua imagem :(',
              type: 'error',
              isLoading: false,
              draggable: true,
              autoClose: 5000,
            },
          );
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setImage(url);
          setLoading(false);
          toast.update(
            toastId,
            {
              render: 'Foto atualizada :)',
              type: 'success',
              isLoading: false,
              draggable: true,
              autoClose: 3000,
            },
          );
        },
      );
    }
  };

  const handleDelete = () => {
    setLoading(true);
    toast.promise(
      updatePhoto({ currentUser }),
      {
        pending: {
          render() { return 'Processando...'; },
          theme: title,
        },
        success: {
          render() {
            setImage(defaultImage);
            setLoading(false);
            return 'Imagem removida :)';
          },
          theme: title,
        },
        error: {
          render() {
            setLoading(false);
            return 'Ocorreu um erro ao remover sua imagem :(';
          },
          theme: title,
        },
      },
    );
  };

  const contextValue = {
    image,
    loading,
    setLoading,
    setImage,
    handleUpload,
    handleDelete,
  };

  return (
    <PhotoContext.Provider value={contextValue}>
      { children }
    </PhotoContext.Provider>
  );
}

PhotoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
