import { updateProfile } from 'firebase/auth';

export const updatePhoto = ({ currentUser, photoURL = '' }) => (
  updateProfile(currentUser, { photoURL })
);

export const updateUserName = ({ currentUser, displayName }) => (
  updateProfile(currentUser, { displayName })
);
