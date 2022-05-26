// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx4C7ngm2xB6Y2aUNgzs2u-UixCaUa-4U",
  authDomain: "manufacture-84b6d.firebaseapp.com",
  projectId: "manufacture-84b6d",
  storageBucket: "manufacture-84b6d.appspot.com",
  messagingSenderId: "743816694918",
  appId: "1:743816694918:web:a66ee968e5f5db17921507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;