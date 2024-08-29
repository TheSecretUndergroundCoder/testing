// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfcZnhs-3OCeE5jsxaPR76E_wCKw87bPA",
  authDomain: "anchor-upload.firebaseapp.com",
  projectId: "anchor-upload",
  storageBucket: "anchor-upload.appspot.com",
  messagingSenderId: "701384851748",
  appId: "1:701384851748:web:22f331245f29fa68c873b1",
  measurementId: "G-2RJVS20D7E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

