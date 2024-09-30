// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqpzJPGFQEC4VryuIdkKYrOvhxWkXErwA",
    authDomain: "love-matcher-67908.firebaseapp.com",
    projectId: "love-matcher-67908",
    storageBucket: "love-matcher-67908.appspot.com",
    messagingSenderId: "673306542856",
    appId: "1:673306542856:web:211f646994a84e635162bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;