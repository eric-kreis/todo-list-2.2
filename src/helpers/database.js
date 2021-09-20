import { database } from '../firebase';

export const getDoc = ({ collName, docName }) => (
  database[collName].doc(docName).get()
);

export const updateDoc = ({ collName, docName, data }) => (
  database[collName].doc(docName).update({ ...data })
);

export const setDoc = ({ collName, docName, data }) => (
  database[collName].doc(docName).set({ ...data })
);
