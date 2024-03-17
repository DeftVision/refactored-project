// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAx5YYHrUXuOJS4sX4qu-aHln6cpl3eZ5E",
    authDomain: "project-evaluation-cbfbd.firebaseapp.com",
    projectId: "project-evaluation-cbfbd",
    storageBucket: "project-evaluation-cbfbd.appspot.com",
    messagingSenderId: "938389573115",
    appId: "1:938389573115:web:587ff9fc4e95f908a50f5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);