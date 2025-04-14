import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
    apiKey:'AIzaSyABjsHxIW_Z4o6bdSITx6ZCFV5HrQca-rg',
    authDomain:'foodmonkey-42009.firebaseapp.com'
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

console.log("Google authentication is set up");

export {auth,provider,signInWithPopup};