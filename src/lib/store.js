import { writable } from "svelte/store";
import { localStore } from "./localStore.js";

export const storiesPos = writable({});
export const storiesScrollPos = writable(0);
export const storiesScrollWidth = writable(0);

// Store pour l'utilisateur connecté
export const user = localStore("user", {
    username: "",
    email: "",
    password: "",
    profilePicture: "",
    bio: "",
    followers: [],
    following: [],
});
export const token = localStore("token", "");
export const isAuthenticated = localStore("isAuthenticated", false);
