// firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCMUYXejZbSqeWMm9Ecc8ihRtkA67cv4fM",
  authDomain: "pitsstop-422bf.firebaseapp.com",
  projectId: "pitsstop-422bf",
  storageBucket: "pitsstop-422bf.appspot.com",
  messagingSenderId: "669861789686",
  appId: "1:669861789686:web:814293d1ea86b8fa5e11d7",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: Auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  const { getReactNativePersistence } = require("firebase/auth");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, app };