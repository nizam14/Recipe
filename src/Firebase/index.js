import firebase from 'firebase'

  const firebaseConfig = {
    apiKey: "AIzaSyDsA8cKPTL3DoIoJzkL5dWNbWrQBQR4UXY",
    authDomain: "recipe-fa3e7.firebaseapp.com",
    projectId: "recipe-fa3e7",
    storageBucket: "recipe-fa3e7.appspot.com",
    messagingSenderId: "163998784077",
    appId: "1:163998784077:web:bd9302825e83aaeb209a04",
    measurementId: "G-YQTBTRNJ7Q"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase