import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlp_ud7BFK9kKtMC0w_faVn6TyTVESyys",
  authDomain: "noimin-fuurin-wedding.firebaseapp.com",
  databaseURL: "https://noimin-fuurin-wedding-default-rtdb.firebaseio.com",
  projectId: "noimin-fuurin-wedding",
  storageBucket: "noimin-fuurin-wedding.appspot.com",
  messagingSenderId: "243666008631",
  appId: "1:243666008631:web:d0438bc4cf9904a0c75db2"
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const storageRef = firebase.storage().ref();
export const database = firebase.database();
