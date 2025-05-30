import { writable } from "svelte/store";

export const localStore = (key, initial) => {
    // receives the key of the local storage and an initial value

    const toString = (value) => JSON.stringify(value, null, 2); // helper function
    const toObj = JSON.parse; // helper function

    // Check if localStorage is available (browser only)
    const hasLocalStorage = typeof localStorage !== 'undefined';

    let saved = initial;
    if (hasLocalStorage) {
        if (localStorage.getItem(key) === null) {
            // item not present in local storage
            localStorage.setItem(key, toString(initial)); // initialize local storage with initial value
        }
        saved = toObj(localStorage.getItem(key)); // convert to object
    }

    const { subscribe, set, update } = writable(saved);

    return {
        subscribe,
        set(value) {
            if (hasLocalStorage) {
                localStorage.setItem(key, toString(value)); // save also to local storage as a string
            }
            return set(value);
        },
        update(fn) {
            if (hasLocalStorage) {
                const currentValue = toObj(localStorage.getItem(key)); // get current value from local storage
                const newValue = fn(currentValue); // apply the update function
                localStorage.setItem(key, toString(newValue)); // save updated value to local storage
            }
            return update(fn);
        }
    };
};
