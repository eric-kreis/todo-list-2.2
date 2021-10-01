import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import { useAuth } from './AuthContext';

import { updatePhoto } from '../helpers/auth';
import { getImgURL, sendImg } from '../helpers/storage';

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

      try {
        await sendImg({
          userId: currentUser.uid,
          customImg,
          name: spacelessName,
        });

        toast.promise(
          getImgURL({
            userId: currentUser.uid,
            imagePath: spacelessName,
          }),
          {
            pending: {
              render() { return 'Processando...'; },
              theme: title,
            },
            success: {
              render({ data }) {
                setLoading(false);
                setImage(data);
                return 'Foto enviada!';
              },
              theme: title,
            },
            error: {
              render() {
                return 'Ocorreu um erro ao receber sua imagem :(';
              },
              theme: title,
            },
          },
        );
      } catch (e) {
        toast.error('Falha ao enviar sua imagem :(');
        setImage(defaultImage);
        setLoading(false);
      }
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
