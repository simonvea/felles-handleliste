import { app } from './firebase';
import type { User } from 'firebase';

class Auth {
  private auth: firebase.auth.Auth;

  constructor(app: firebase.app.App) {
    this.auth = app.auth();
  }

  async login(email: string, password: string) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
    } catch (err) {
      console.error(err);
    }
  }

  get currentUser() {
    return this.auth.currentUser;
  }

  get isLoggedIn() {
    return !!this.auth.currentUser;
  }

  addListener(cb: (user: User) => void) {
    this.auth.onAuthStateChanged(cb);
  }
}

export default new Auth(app);
