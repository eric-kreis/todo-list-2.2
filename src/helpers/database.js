import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { db, getCurrentTimestamp } from '../firebase';
import { userData, users } from '../utils/collections';

export const getDocument = ({ collName, docName }) => (
  getDoc(doc(db, collName, docName))
);
export const updateDocument = ({ collName, docName, data }) => (
  updateDoc(doc(db, collName, docName), { ...data })
);

export const setDocument = ({ collName, docName, data }) => (
  setDoc(doc(db, collName, docName), { ...data })
);

export const createUserDocs = (currentUser) => {
  setDocument({
    collName: users,
    docName: currentUser.uid,
    data: {
      firstEmail: currentUser.email,
      currentEmail: currentUser.email,
      firstLogin: getCurrentTimestamp(),
    },
  });

  setDocument({
    collName: userData,
    docName: currentUser.uid,
    data: {
      tasks: [],
      checkedItems: [],
    },
  });
};
