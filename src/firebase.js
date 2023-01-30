import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'



const firebaseConfig = {
  apiKey: "AIzaSyBXM0NEzmyzAgM02cXGnX3-skmo4GL70-8",
  authDomain: "trading--game.firebaseapp.com",
  projectId: "trading--game",
  storageBucket: "trading--game.appspot.com",
  messagingSenderId: "980050881982",
  appId: "1:980050881982:web:32247565ca0a9da18b9def",
  measurementId: "G-JR8HQZG0QV"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const firestore = firebase.firestore()

const usersCollection = firestore.collection('users')
const itemsCollection = firestore.collection('items')

export { app, auth, firestore, usersCollection, itemsCollection }