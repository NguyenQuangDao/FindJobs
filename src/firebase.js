import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUWkTdmHoLc5NQKKoIxAmQPdUtwWhrpNY",
  authDomain: "mynetflix-df1e3.firebaseapp.com",
  projectId: "mynetflix-df1e3",
  storageBucket: "mynetflix-df1e3.appspot.com",
  messagingSenderId: "354916205160",
  appId: "1:354916205160:web:f5304165f1deee153ff1dd",
  measurementId: "G-FLM3WR1F3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
