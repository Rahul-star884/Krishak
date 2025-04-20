




import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGwQ_1YPD-8x49dntg3ynNOtAcp16XGwc",
  authDomain: "my-project-f5df0.firebaseapp.com",
  projectId: "my-project-f5df0",
  storageBucket: "my-project-f5df0.firebasestorage.app",
  messagingSenderId: "358995734242",
  appId: "1:358995734242:web:954dbf54235223cae5b8bb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
