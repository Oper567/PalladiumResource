import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOC9Dxxdx_zU1c3VktqSVwjtt9KOy-ZR4",
  authDomain: "palladium-resurce.firebaseapp.com",
  projectId: "palladium-resurce",
  storageBucket: "palladium-resurce.firebasestorage.app", // This is where your images go!
  messagingSenderId: "560609517114",
  appId: "1:560609517114:web:0dac4360ae32fd20971f03",
  measurementId: "G-FYMXLLM92W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in AdminDashboard and ShopPage
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;