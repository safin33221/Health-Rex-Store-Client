// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB11_5siJlAMRX3OkukjdQNoxpiJ1_rQfM",
    authDomain: "healthrexstore.firebaseapp.com",
    projectId: "healthrexstore",
    storageBucket: "healthrexstore.firebasestorage.app",
    messagingSenderId: "500512538037",
    appId: "1:500512538037:web:8582660a533eeda4fbedfc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)