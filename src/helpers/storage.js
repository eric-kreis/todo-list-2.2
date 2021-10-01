import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

export const getImgURL = ({ userId, imagePath }) => (
  getDownloadURL(ref(storage, `images/${userId}/${imagePath}`))
);

export const sendImg = ({ userId, customImg, name }) => {
  const metaData = {
    contentType: customImg.type,
    name: customImg.name,
  };
  const storageRef = ref(storage, `images/${userId}/${name}`);
  return uploadBytes(storageRef, customImg, metaData);
};
