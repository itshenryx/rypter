import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBFtpBxCBgXq2OzrFEPPIyeG-Elng_0n40",
  authDomain: "rypter-50929.firebaseapp.com",
  projectId: "rypter-50929",
  storageBucket: "rypter-50929.appspot.com",
  messagingSenderId: "479209455106",
  appId: "1:479209455106:web:c79885aed896d74c02711b"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire