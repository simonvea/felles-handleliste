import { writable, derived } from 'svelte/store';
import type { User } from 'firebase';

const user = writable(undefined);

export const updateUser = (newUser: User) => user.set(newUser);

export const isLoggedin = derived(user, ($user) => !!$user);

export const resetUser = () => user.set(undefined);

export default user;
