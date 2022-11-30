import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCw4dlN23BYIYLMbesVeatmR2h2zMrgsfA",
  authDomain: "memda-dev.firebaseapp.com",
  databaseURL: "https://memda-dev-default-rtdb.firebaseio.com",
  projectId: "memda-dev",
  storageBucket: "memda-dev.appspot.com",
  messagingSenderId: "226104312081",
  appId: "1:226104312081:web:e9722b5b872726e35b8cb0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

const logout = () => {
  signOut(auth);
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    return err;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export {
  app,
  auth,
  db,
  functions,
  logout,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
};
