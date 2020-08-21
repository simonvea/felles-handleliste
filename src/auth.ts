import { app } from './firebase';
import { resetUser, updateUser } from './userstore';

export const init = () => {
  app.auth().onAuthStateChanged((user) => {
    user ? updateUser(user) : resetUser();
  });
};

export const login = async (email: string, password: string) => {
  try {
    await app.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  try {
    await app.auth().signOut();
  } catch (err) {
    console.error(err);
  }
};
