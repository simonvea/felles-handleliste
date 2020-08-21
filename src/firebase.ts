import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { resetUser, updateUser } from './userstore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_FyKIbpRVTyjw4JrcPb8bbvVmTB7SBvI',
  authDomain: 'felles-handleliste.firebaseapp.com',
  databaseURL: 'https://felles-handleliste.firebaseio.com',
  projectId: 'felles-handleliste',
  storageBucket: 'felles-handleliste.appspot.com',
  messagingSenderId: '925360885806',
  appId: '1:925360885806:web:82d4b30bbb549ed2828fbf',
};

export const app = firebase.initializeApp(firebaseConfig);
