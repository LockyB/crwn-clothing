import firebase from 'firebase/app'; //base import to firebase, but we don't want everything
import 'firebase/firestore'; //for database
import 'firebase/auth'; //for auth

const config = {
    apiKey: "AIzaSyChWH8hxTaicglZlUO3fxQi4REq9v1DytA",
    authDomain: "crwn-db-b445e.firebaseapp.com",
    projectId: "crwn-db-b445e",
    storageBucket: "crwn-db-b445e.appspot.com",
    messagingSenderId: "468173914206",
    appId: "1:468173914206:web:5e264e01f0b143d2d5b4cf",
    measurementId: "G-RFCRNHZE7M"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//access to the google auth provider from .auth
const provider = new firebase.auth.GoogleAuthProvider();
//show the prompt to select different google account
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;