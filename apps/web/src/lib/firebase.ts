import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDzhKsZeowjo1aiTQvMJCKqktWsD-LS17w",
  authDomain: "mafekidsbr.firebaseapp.com",
  projectId: "mafekidsbr",
  storageBucket: "mafekidsbr.firebasestorage.app",
  messagingSenderId: "16456704349",
  appId: "1:16456704349:web:4b1d742210ef0f0f4448b4",
  measurementId: "G-FWQ5PBLPYS"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

// Initialize Analytics conditionally (only in browser environment)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => yes ? (analytics = getAnalytics(app)) : null);
}

export { app, auth, analytics };
