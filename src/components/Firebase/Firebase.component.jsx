import firebase from 'firebase/app';
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

// firebase.db reverted to original firebase.dataBase

// export const db = firebase.firestore();
export const dataBase = firebase.firestore();

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }
}

export default Firebase;
