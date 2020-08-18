import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_FyKIbpRVTyjw4JrcPb8bbvVmTB7SBvI',
  authDomain: 'felles-handleliste.firebaseapp.com',
  databaseURL: 'https://felles-handleliste.firebaseio.com',
  projectId: 'felles-handleliste',
  storageBucket: 'felles-handleliste.appspot.com',
  messagingSenderId: '925360885806',
  appId: '1:925360885806:web:82d4b30bbb549ed2828fbf',
};

// Get a Firestore instance
// export const db = firebase
//   .initializeApp({ projectId: 'felles-handleliste' })
//   .firestore()

export const db = firebase.initializeApp(firebaseConfig).firestore();

db.enablePersistence().catch(function (err) {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});
