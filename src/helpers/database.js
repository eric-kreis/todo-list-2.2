import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const getDocument = ({ collName, docName }) => (
  getDoc(doc(db, collName, docName))
);

export const updateDocument = ({ collName, docName, data }) => (
  updateDoc(doc(db, collName, docName), { ...data })
);

export const setDocument = ({ collName, docName, data }) => (
  setDoc(doc(db, collName, docName), { ...data })
);
