// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB35fQ4-s-9i5a29DOCwiZI3HaSO5ywaH0",
  authDomain: "user-authentication-dc09a.firebaseapp.com",
  projectId: "user-authentication-dc09a",
  storageBucket: "user-authentication-dc09a.appspot.com",
  messagingSenderId: "931056442948",
  appId: "1:931056442948:web:e3395bfc83c95e1fdc2611"
};

// Initialize Firebase
// Check if Firebase has already been initialized
if (!firebase.apps.length) {
  // If Firebase is not initialized, initialize it with the provided configuration
  firebase.initializeApp(firebaseConfig);
}

// Export the initialized Firebase instance as the default export
export default firebase;