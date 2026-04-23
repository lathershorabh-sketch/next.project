import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "movexpress-317a7.firebaseapp.com",
  projectId: "movexpress-317a7",
  storageBucket: "movexpress-317a7.firebasestorage.app",
  messagingSenderId: "830239149759",
  appId: "1:830239149759:web:b3ccd41ea87e2f9bdb800a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);