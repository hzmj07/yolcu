// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "...",
  authDomain: "testproj-76e6a.firebaseapp.com",
  projectId: "testproj-76e6a",
  storageBucket: "testproj-76e6a.appspot.com",
  messagingSenderId: "207397823966",
  appId: "1:207397823966:web:9f0010219773f5e0b5a94f",
  measurementId: "G-YPNL7CV8J7"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);

const analytics = getAnalytics(app);
const db = getFirestore(app);

async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

export default Auth;
