import { ref } from 'firebase/storage';
import { storage } from '../firebase';

export default (userId, imagePath) => (
  ref(storage, `images/${userId}/${imagePath}`)
);
