// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs,query, where, doc, updateDoc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getAuth, } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsqnRBOc0ZYeSdPT0SaihqhsNqtTzcCAs",
  authDomain: "mathapp-cs3.firebaseapp.com",
  projectId: "mathapp-cs3",
  storageBucket: "mathapp-cs3.appspot.com",
  messagingSenderId: "591794021020",
  appId: "1:591794021020:web:49b9379087fd7362eec359",
  measurementId: "G-EGGG5WP9G3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const FIREBASE_AUTH = getAuth(app);

export {app, db, getFirestore,addDoc,query,  collection, getDocs, where,doc, updateDoc, getDoc, deleteDoc, FIREBASE_AUTH, setDoc };