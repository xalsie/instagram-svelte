import { writable } from 'svelte/store';
import { localStore } from './localStore.js';
import type { UserLite } from './types';

export const storiesPos = writable<Record<string, unknown>>({});
export const storiesScrollPos = writable(0);
export const storiesScrollWidth = writable(0);

// Store pour l'utilisateur connecté
export const user = localStore<UserLite>('user', {
	_id: '',
	username: '',
	src: '',
	role: '',
	email: ''
});
export const token = localStore('token', '');
export const isAuthenticated = localStore('isAuthenticated', false);
export const storyViews = localStore('storyViews', {});
