import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import storageRef from '../utils/storageRef';

export const getImgURL = ({ userId, imagePath }) => (
  getDownloadURL(storageRef(userId, imagePath))
);

export const sendImg = ({ userId, customImg, imagePath }) => {
  const metaData = {
    contentType: customImg.type,
    imagePath: customImg.name,
  };

  return uploadBytesResumable(
    storageRef(userId, imagePath),
    customImg,
    metaData,
  );
};
