import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA7IMrfuD4vHx_r2vgR-LrfyGbpxVsRDWQ",
  authDomain: "blogpage-23fba.firebaseapp.com",
  projectId: "blogpage-23fba",
  storageBucket: "blogpage-23fba.appspot.com",
  messagingSenderId: "421035352329",
  appId: "1:421035352329:web:3e262e3d0a292afb5033d8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app, auth}