import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(config);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const getCurrentTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const storage = firebase.storage();

export default app;
