import { storage } from '../firebase';

export const getImgURL = ({ userId, imagePath }) => (
  storage
    .ref(`images/${userId}`)
    .child(imagePath)
    .getDownloadURL()
);

export const sendImg = ({ userId, name, customImg }) => {
  const metaData = {
    contentType: customImg.type,
    name: customImg.name,
  };

  return storage
    .ref(`images/${userId}`)
    .child(name)
    .put(customImg, metaData);
};
