import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDl9f_P7oDF2v5CR-5RHbW7xfysMs4OpP0',
  authDomain: 'tcl-11-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-11-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-11-smart-shopping-list',
  storageBucket: 'tcl-11-smart-shopping-list.appspot.com',
  messagingSenderId: '883730532272',
  appId: '1:883730532272:web:45b002254a4bf323273875',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//To reference database
export const dataBase = firebase.firestore();

export default firebase;
