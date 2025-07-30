// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3F9voYGEvdz3nh1JA2mdoUfo9sPJDryc",
  authDomain: "hatchef.firebaseapp.com",
  projectId: "hatchef",
  storageBucket: "hatchef.firebasestorage.app",
  messagingSenderId: "903434161548",
  appId: "1:903434161548:web:6283cd2a5267334d96daa9",
  measurementId: "G-R4JZY9N4PH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
