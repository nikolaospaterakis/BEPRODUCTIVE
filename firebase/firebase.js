
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, collection } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWQg9TyVS9629rJfP7Tls935nZXB3qE4Q",
  authDomain: "loginpage-49b70.firebaseapp.com",
  databaseURL: "https://loginpage-49b70-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "loginpage-49b70",
  storageBucket: "loginpage-49b70.appspot.com",
  messagingSenderId: "187125543258",
  appId: "1:187125543258:web:3955557df7ea8a2e914363"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const users = collection(db, "users")
const auth = getAuth(app)

export { app, auth, db, users }