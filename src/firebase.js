import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQ8hTS-qfJgg0k52CsIDmqoxhbFabySZo",
  authDomain: "civical-fea89.firebaseapp.com",
  projectId: "civical-fea89",
  storageBucket: "civical-fea89.appspot.com",
  messagingSenderId: "545526475950",
  appId: "1:545526475950:web:7247b8290fde67ec2f513f",
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);
const storage=getStorage(app);

export {auth,db,storage};






// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDQ8hTS-qfJgg0k52CsIDmqoxhbFabySZo",
//   authDomain: "civical-fea89.firebaseapp.com",
//   projectId: "civical-fea89",
//   storageBucket: "civical-fea89.appspot.com",
//   messagingSenderId: "545526475950",
//   appId: "1:545526475950:web:7247b8290fde67ec2f513f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
