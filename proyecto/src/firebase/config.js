import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDtSIEaccFX1JQl_Xubth4p89DPKyGqcvU",
  authDomain: "react-native-b057b.firebaseapp.com",
  projectId: "react-native-b057b",
  storageBucket: "react-native-b057b.appspot.com",
  messagingSenderId: "712606092958",
  appId: "1:712606092958:web:33831391aabfd1608bf58f"
}

  app.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const storage = app.storage();
  export const db = app.firestore();