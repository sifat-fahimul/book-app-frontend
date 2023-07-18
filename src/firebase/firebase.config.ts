import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoIDteDUbq35dYO3wYpBxlMBROFzsWCIA",
  authDomain: "book-catalog-8f1db.firebaseapp.com",
  projectId: "book-catalog-8f1db",
  storageBucket: "book-catalog-8f1db.appspot.com",
  messagingSenderId: "413002158115",
  appId: "1:413002158115:web:460457adb0bdcdd85c2196",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
