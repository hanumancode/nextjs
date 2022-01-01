import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import firebaseConfig from "./config/firebaseConfig";

// variable acts as an entry point between app and firebase

const firebaseApp = initializeApp(firebaseConfig);

// firebase authentication
const auth = getAuth(firebaseApp);

// firebase db
const db = getFirestore(firebaseApp);

export { auth, db };