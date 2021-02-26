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

//this allows us to create a new user document when sign in with google
//first it checks the userAuth object
//we do not need any state 
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  //note that returning snapShot is a "getter" function which means we need to reference the property name
  //to return the actual value of the property
  // console.log(snapShot.id);

  if(!snapShot.exists) {
    const {displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  //we may still want to use userRef after creating the records in database.
  return userRef;
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