import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "palladium-resurce.firebaseapp.com",
  projectId: "palladium-resurce",
  storageBucket: "palladium-resurce.firebasestorage.app",
  messagingSenderId: "560609517114",
  appId: "1:560609517114:web:0dac4360ae32fd20971f03",
  measurementId: "G-FYMXLLM92W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;