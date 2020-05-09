import * as firebase from "firebase/app";
import "firebase/database";
const config = {
  apiKey: "AIzaSyBYntZ1McXRDqXKQ3Mp9wHYyxhbMofQmzY",
  authDomain: "unmatched-6b401.firebaseapp.com",
  databaseURL: "https://unmatched-6b401.firebaseio.com",
  projectId: "unmatched-6b401",
  storageBucket: "unmatched-6b401.appspot.com",
  messagingSenderId: "443517520355",
  appId: "1:443517520355:web:9529e9603d204f6fee38d6"
};
firebase.initializeApp(config);

export default firebase.database();
