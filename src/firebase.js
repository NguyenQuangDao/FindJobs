import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWm4RBT_VdZhxPiaSyyRnFe2OuI8N4XeA",
  authDomain: "jobvn-9e4c0.firebaseapp.com",
  projectId: "jobvn-9e4c0",
  storageBucket: "jobvn-9e4c0.firebasestorage.app",
  messagingSenderId: "517051228672",
  appId: "1:517051228672:web:b3d3334816674e227f6ee5",
  measurementId: "G-3GH5MPCG0Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
