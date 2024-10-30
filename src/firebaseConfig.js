// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs,deleteDoc,doc,updateDoc } from "firebase/firestore"; // Import addDoc here

const firebaseConfig = {
  apiKey: "AIzaSyD499NVVPxAxZh_aRu3KCtrsynM7UF0U5A",
  authDomain: "myportfolio-bcd6a.firebaseapp.com",
  projectId: "myportfolio-bcd6a",
  storageBucket: "myportfolio-bcd6a.appspot.com",
  messagingSenderId: "272114188654",
  appId: "1:272114188654:web:0d06c9b4d69bcd8c61417f",
  measurementId: "G-FDCY3BJ8MS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs,deleteDoc,doc,updateDoc };
