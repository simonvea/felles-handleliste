import firebase from 'firebase/app';
import config from '../firebaseConfig';
import 'firebase/firestore';
import 'firebase/auth';

export const app = firebase.initializeApp(config);
