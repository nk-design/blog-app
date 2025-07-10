import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBSPC6rO6zCMVAMO8EByHS-Al-vtJyj_hA",
  authDomain: "blog-app-5efe9.firebaseapp.com",
  projectId: "blog-app-5efe9",
  storageBucket: "blog-app-5efe9.firebasestorage.app",
  messagingSenderId: "858546811632",
  appId: "1:858546811632:web:72f85751dc5867d0d0c835",
  measurementId: "G-Y4RWS62H7V"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
