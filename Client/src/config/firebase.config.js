import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';
import {getApp, getApps, initializeApp} from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

// const firebaseConfig = {
//     apiKey: "AIzaSyADS8ZXIc_puNE3zMTwK5GUVSAB5qMZIW4",
//     authDomain: "laceup-a612e.firebaseapp.com",
//     projectId: "laceup-a612e",
//     storageBucket: "laceup-a612e.appspot.com",
//     messagingSenderId: "735133845477",
//     appId: "1:735133845477:web:afa0435cfdac5b1969510c"
//   };
  

const app = getApps.length !== 0 ? getApp() : initializeApp(firebaseConfig);

const storage = getStorage(app);
const database = getFirestore(app)

export {app, storage, database};