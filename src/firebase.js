import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJ-8bFvp9lR29pUb0_mvxmHviWZ2mFOiY",
    authDomain: "clip-clap-1eecb.firebaseapp.com",
    projectId: "clip-clap-1eecb",
    storageBucket: "clip-clap-1eecb.appspot.com",
    messagingSenderId: "767280865353",
    appId: "1:767280865353:web:0520ba3baa0a7845469f98"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = firebase.auth();
export default auth;

const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();