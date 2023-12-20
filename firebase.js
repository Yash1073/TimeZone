// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbD714PzsZthFbe6JlkrGpYYX_SgyN_Ws",
  authDomain: "playpower-6c23c.firebaseapp.com",
  projectId: "playpower-6c23c",
  storageBucket: "playpower-6c23c.appspot.com",
  messagingSenderId: "228770988276",
  appId: "1:228770988276:web:cf0390533e6834d3295ea1",
  measurementId: "G-QQ2Q6Q8V48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);