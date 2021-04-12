import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCjC6FP0cKgtLsn33kLqRZ9pifnSGKZ8sc",
    authDomain: "twitterclone-66b50.firebaseapp.com",
    projectId: "twitterclone-66b50",
    storageBucket: "twitterclone-66b50.appspot.com",
    messagingSenderId: "478011838936",
    appId: "1:478011838936:web:79fc55ed4f1eda7b4062ad",
    measurementId: "G-WT8DZ89N29"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();
export const auth = fb.auth();
export const storage = fb.storage();
export const google = new firebase.auth.GoogleAuthProvider();
