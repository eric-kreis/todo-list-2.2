import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import { storage } from '../firebase';
import { useAuth } from './AuthContext';

import { getDoc, updateDoc } from '../helpers/database';
import defaultImage from '../assets/default-profile.png';
import collections from '../helpers/collections';

const PhotoContext = createContext();

export const usePhoto = () => useContext(PhotoContext);

export default function PhotoProvider({ children }) {
  const { users } = collections;
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
          const doc = await getDoc({
            collName: users,
            docName: currentUser.uid,
          });

          if (doc.exists && doc.data().imagePath !== '/') {
            const imageURL = await storage
              .ref(`images/${currentUser.uid}`)
              .child(doc.data().imagePath)
              .getDownloadURL();

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
  }, [currentUser, users]);

  // State observer;
  useEffect(() => {
    (async () => {
      if (currentUser) {
        try {
          setError('');
          const doc = await getDoc({
            collName: users,
            docName: currentUser.uid,
          });

          if (path !== '/' && doc.exists && doc.data().imagePath !== path) {
            await updateDoc({
              collName: users,
              docName: currentUser.uid,
              data: { imagePath: path },
            });
          }
        } catch (imageError) {
          setError('Falha ao salvar o enderço da sua imagem :(');
          setPath('/');
        }
      }
    })();
  }, [currentUser, loading, path, users]);

  const handleDelete = async () => {
    setLoading(true);
    await toast.promise(
      updateDoc({
        collName: users,
        docName: currentUser.uid,
        data: { imagePath: '/' },
      }),
      {
        pending: {
          render() { return 'Processando...'; },
          theme: title,
        },
        success: {
          render() { return 'Imagem removida :)'; },
          theme: title,
        },
        error: {
          render() { return 'Falha ao deletar a imagem :('; },
          theme: title,
        },
      },
    );
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
