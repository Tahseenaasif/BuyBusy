import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  //add your firebase config here 
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
