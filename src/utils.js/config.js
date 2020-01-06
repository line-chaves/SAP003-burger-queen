import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCE7uBNLs1X4AfTyCDmDUQ6yvykrrMWjYI",
    authDomain: "burger-queen-5edc9.firebaseapp.com",
    databaseURL: "https://burger-queen-5edc9.firebaseio.com",
    projectId: "burger-queen-5edc9",
    storageBucket: "burger-queen-5edc9.appspot.com",
    messagingSenderId: "133417481431",
    appId: "1:133417481431:web:607d55897e0bb0ed842c92"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();

export default firestore;