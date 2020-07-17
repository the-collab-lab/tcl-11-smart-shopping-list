// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyDl9f_P7oDF2v5CR-5RHbW7xfysMs4OpP0',
  authDomain: 'tcl-11-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-11-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-11-smart-shopping-list',
  storageBucket: 'tcl-11-smart-shopping-list.appspot.com',
  messagingSenderId: '883730532272',
  appId: '1:883730532272:web:45b002254a4bf323273875',
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
