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

import { getDocument, updateDocument } from '../helpers/database';
import defaultImage from '../assets/default-profile.png';
import { users } from '../utils/collections';
import { getImgURL, sendImg } from '../helpers/storage';

const PhotoContext = createContext();

export const usePhoto = () => useContext(PhotoContext);

export default function PhotoProvider({ children }) {
  const { title } = useContext(ThemeContext);
  const { currentUser } = useAuth();

  const [image, setImage] = useState(defaultImage);
  const [path, setPath] = useState('/');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const resetState = () => {
    setImage(defaultImage);
    setPath('/');
    setError('');
    setLoading(true);
  };

  useEffect(() => {
    (async () => {
      if (currentUser) {
        try {
          const doc = await getDocument({
            collName: users,
            docName: currentUser.uid,
          });

          if (doc.exists() && doc.data().imagePath !== '/') {
            const imageURL = await getImgURL({
              userId: currentUser.uid,
              imagePath: doc.data().imagePath,
            });

            setPath(doc.data().imagePath);
            setImage(imageURL);
          }
        } catch (imageError) {
          switch (imageError.code) {
            case 'storage/object-not-found':
              setError('Foto não encontrada');
              break;
            case 'storage/unauthorized':
              setError('Você não têm permissão para acessar este arquivo');
              break;
            case 'storage/canceled':
              setError('Download da imagem cancelado');
              break;
            default:
              setError('Ocorreu um problema ao carregar a imagem');
              break;
          }
          setPath('/');
          setImage(defaultImage);
        }
        setLoading(false);
      } else {
        resetState();
      }
    })();
  }, [currentUser]);

  // State observer;
  useEffect(() => {
    (async () => {
      if (currentUser && !loading) {
        try {
          setError('');
          await updateDocument({
            collName: users,
            docName: currentUser.uid,
            data: { imagePath: path },
          });
        } catch (imageError) {
          setError('Falha ao salvar o enderço de sua imagem :(');
          setImage(defaultImage);
          setPath('/');
        }
      }
    })();
  }, [currentUser, loading, path]);

  const handleUpload = async (customImg) => {
    if (customImg.type) {
      setError('');
      setLoading(true);

      const spacelessName = customImg.name.split(' ').join('');
      try {
        await toast.promise(
          sendImg({
            userId: currentUser.uid,
            name: spacelessName,
            customImg,
          }),
          {
            pending: {
              render() { return 'Processando...'; },
              theme: title,
            },
            success: {
              render() { return 'Foto Atualizada!'; },
              theme: title,
            },
          },
        );

        const reader = new FileReader();
        reader.readAsDataURL(customImg);
        reader.onload = ({ target }) => setImage(target.result);
        setPath(spacelessName);
      } catch (imageError) {
        setError('Falha ao atualizar sua imagem :(');
        setImage(defaultImage);
        setPath('/');
      }
      setLoading(false);
    }
  };

  const handleDelete = () => {
    setLoading(true);
    toast.success('Imagem removida :)');
    setPath('/');
    setImage(defaultImage);
    setLoading(false);
  };

  const contextValue = {
    image,
    loading,
    path,
    error,
    setPath,
    setLoading,
    setError,
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
