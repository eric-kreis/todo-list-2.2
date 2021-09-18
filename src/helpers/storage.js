import { storage } from '../firebase';

export const getImgURL = ({ userID, imagePath }) => (
  storage
    .ref(`images/${userID}`)
    .child(imagePath)
    .getDownloadURL()
);

export const sendImg = ({ userID, name, customImg }) => {
  const metaData = {
    contentType: customImg.type,
    name: customImg.name,
  };

  return storage
    .ref(`images/${userID}`)
    .child(name)
    .put(customImg, metaData);
};
