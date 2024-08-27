import * as firebase from 'firebase/app'
import * as firebaseAuth from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAWielmTkYCbmzKVzouiJXyDxiieMbcvd4",
    authDomain: "stockbucket-54bb9.firebaseapp.com",
    projectId: "stockbucket-54bb9",
    storageBucket: "stockbucket-54bb9.appspot.com",
    messagingSenderId: "1081295465934",
    appId: "1:1081295465934:web:4680074d2408d7f4914f9f",
    measurementId: "G-4BJ06VJB80"
  };

const app = firebase.initializeApp(firebaseConfig);

export const auth = firebaseAuth.initializeAuth(app);

