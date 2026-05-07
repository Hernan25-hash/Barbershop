import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBGsQh3p4JKcQiDifwuh4CKiJ9_yenBvjg",
  authDomain: "barber-65eaa.firebaseapp.com",
  projectId: "barber-65eaa",
  storageBucket: "barber-65eaa.firebasestorage.app",
  messagingSenderId: "1050366542775",
  appId: "1:1050366542775:web:638e086938821095649e32",
  measurementId: "G-0YL11DBZMP",
};

// Init app safely (Next.js safe)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// ✅ SERVICES (THIS WAS MISSING)
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics (client only)
let analytics: any = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, analytics };
