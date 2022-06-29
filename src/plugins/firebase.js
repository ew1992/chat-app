import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/compat/app'
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";

Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGE_SENDING,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID
});

async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe()
      resolve(user);
    }, reject);
  });
}

export default {
  getFirestore,
  getCurrentUser
};
