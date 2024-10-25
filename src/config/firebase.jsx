
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA3ViTvC9ScxqFXPXCoMW63Dw7ucNPZQdo",
  authDomain: "fir-practice-b5465.firebaseapp.com",
  projectId: "fir-practice-b5465",
  storageBucket: "fir-practice-b5465.appspot.com",
  messagingSenderId: "653762337281",
  appId: "1:653762337281:web:c2269e3c22b015f1cd3e00",
  measurementId: "G-Y2KCSMYHQ2"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvide = new GoogleAuthProvider();

export const db = getFirestore(app);