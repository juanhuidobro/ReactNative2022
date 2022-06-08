import app from 'firebase/app';
import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyDFb6ZeROZju3FqzrNS57Fq3gzSQLT1x6Y",
    authDomain: "reactnative-p3.firebaseapp.com",
    projectId: "reactnative-p3",
    storageBucket: "reactnative-p3.appspot.com",
    messagingSenderId: "761576025921",
    appId: "1:761576025921:web:b9dd5a29bc996520b8fbc0",
    measurementId: "G-02Q1QHWTKS"
  };

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();