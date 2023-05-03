import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore}  from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs5-6jAKdodMcAmQf1t8hYhHuZGbWE8Ig",
  authDomain: "letschat-app-2556e.firebaseapp.com",
  projectId: "letschat-app-2556e",
  storageBucket: "letschat-app-2556e.appspot.com",
  messagingSenderId: "790958195171",
  appId: "1:790958195171:web:ff7412abc3eae264d160d6",
  measurementId: "G-B5T3PWCG6K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();