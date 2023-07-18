import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsqN8u1B5M9_e-dMMzcVdO5Sq5it9KOJc",
  authDomain: "book-app-63464.firebaseapp.com",
  projectId: "book-app-63464",
  storageBucket: "book-app-63464.appspot.com",
  messagingSenderId: "377997819808",
  appId: "1:377997819808:web:bf9eab317710db6e63aec5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
