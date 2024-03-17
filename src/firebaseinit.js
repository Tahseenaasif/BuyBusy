import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyCt24p7U5_-Sfuj1BSCXtCxM747l9BNr0Y",

  authDomain: "buybusy-da290.firebaseapp.com",

  projectId: "buybusy-da290",

  storageBucket: "buybusy-da290.appspot.com",

  messagingSenderId: "440805383340",

  appId: "1:440805383340:web:5e57e61c929ef4a8355309"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);