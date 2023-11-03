// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEuZ56UaPQqN5pBPvs6vW7Up5y5PNdaO8",
  authDomain: "passwordmanager-d4864.firebaseapp.com",
  projectId: "passwordmanager-d4864",
  storageBucket: "passwordmanager-d4864.appspot.com",
  messagingSenderId: "260281468250",
  appId: "1:260281468250:web:572549c72f947fbc8d9f63"
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig);
const auth1 = getAuth(app1);
const firestore1 = getFirestore(app1);

export {firestore1, auth1, app1}
