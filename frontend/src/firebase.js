// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics"; // ❌ optional

// 🔥 NEW ACVORA FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDxfcV4hrTz9VlzLnV4uAlvzEOyPuA88_M",
  authDomain: "acvora-d813a.firebaseapp.com",
  projectId: "acvora-d813a",
  storageBucket: "acvora-d813a.firebasestorage.app",
  messagingSenderId: "563252443352",
  appId: "1:563252443352:web:d1fea1616f596979d03fad",
  measurementId: "G-CZM207W44D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ⚠️ Analytics only enable in production
// export const analytics = getAnalytics(app);

export default app;
