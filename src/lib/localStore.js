import { writable } from 'svelte/store';

/**
 * @template T
 * @param {string} key
 * @param {T} initial
 */
export const localStore = (key, initial) => {
	// receives the key of the local storage and an initial value

	/** @param {any} value */
	const toString = (value) => JSON.stringify(value, null, 2); // helper function
	/** @param {string} value */
	const toObj = JSON.parse; // helper function

	// Check if localStorage is available (browser only)
	const hasLocalStorage = typeof localStorage !== 'undefined';

	let saved = initial;
	if (hasLocalStorage) {
		const item = localStorage.getItem(key);
		if (item !== null) {
			saved = toObj(item); // convert to object
		}
	}

	const { subscribe, set, update } = writable(saved);

	return {
		subscribe,
		/** @param {T} value */
		set(value) {
			if (hasLocalStorage) {
				localStorage.setItem(key, toString(value)); // save also to local storage as a string
			}
			set(value);
		},
		/** @param {(value: T) => T} fn */
		update(fn) {
			if (hasLocalStorage) {
				const item = localStorage.getItem(key);
				const currentValue = item !== null ? toObj(item) : initial; // get current value from local storage
				const newValue = fn(currentValue); // apply the update function
				localStorage.setItem(key, toString(newValue)); // save updated value to local storage
				set(newValue);
			}
		}
	};
};
