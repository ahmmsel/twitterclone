import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAQG4NGvgXGhbImqXs2MkY4BZp3zlxqjA4",
  authDomain: "twitter-clone-6112b.firebaseapp.com",
  projectId: "twitter-clone-6112b",
  storageBucket: "twitter-clone-6112b.appspot.com",
  messagingSenderId: "184333793856",
  appId: "1:184333793856:web:e8ea18bb600726e971fda5",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const storage = getStorage();

export { app, db, storage };
