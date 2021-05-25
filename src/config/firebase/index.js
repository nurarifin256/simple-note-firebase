/* eslint-disable linebreak-style */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDmNhD56wl-6tXxlzgNIm15CBb9xyPxKxs',
  authDomain: 'simple-notes-firebase-5eb33.firebaseapp.com',
  projectId: 'simple-notes-firebase-5eb33',
  storageBucket: 'simple-notes-firebase-5eb33.appspot.com',
  messagingSenderId: '196532373878',
  appId: '1:196532373878:web:3e9f20e9707ffffbc25257',
  measurementId: 'G-WSYSMJ3MKY',
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
