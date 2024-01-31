// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyVTz2Tk7zQXpf8u5a97dCv9CI8XsVY4M",
  authDomain: "mymqtt-c2861.firebaseapp.com",
  projectId: "mymqtt-c2861",
  storageBucket: "mymqtt-c2861.appspot.com",
  messagingSenderId: "1087164320610",
  appId: "1:1087164320610:web:a8d29f60c2787cb6727a3b",
  measurementId: "G-B11SPNDKK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db, ref, onValue };  // Export database references for later use
