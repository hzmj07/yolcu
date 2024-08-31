// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Firestore } from "firebase/firestore";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
{{ secrets.API_KEY }}

console.log("kontrol")

// Initialize Firebase
const app = initializeApp(firebaseConfig);





export default app




