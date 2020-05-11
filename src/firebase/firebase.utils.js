import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  
  apiKey: "AIzaSyCwMvaUkxLAQ4o15WoaeuopXAZQNes8Xqw",
  authDomain: "crwn-db-7127c.firebaseapp.com",
  databaseURL: "https://crwn-db-7127c.firebaseio.com",
  projectId: "crwn-db-7127c",
  storageBucket: "crwn-db-7127c.appspot.com",
  messagingSenderId: "952888926820",
  appId: "1:952888926820:web:f55defdfbc502559df3571",
  measurementId: "G-9W550WYH4W"
  
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  
  return userRef;

};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;