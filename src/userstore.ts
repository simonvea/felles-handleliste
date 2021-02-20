import { writable, derived } from 'svelte/store';
import type firebase from 'firebase/app';

const user = writable<firebase.User>(undefined);

export const updateUser = (newUser: firebase.User) => user.set(newUser);

export const isLoggedin = derived(user, ($user) => !!$user);

export const resetUser = () => user.set(undefined);

export default user;
