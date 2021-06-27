import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
   apiKey: "AIzaSyDy-yp4NZO-NDBM6ZyfnKsKxtFZZmM8wuI",
   authDomain: "pwcc-77fc2.firebaseapp.com",
   projectId: "pwcc-77fc2",
   storageBucket: "pwcc-77fc2.appspot.com",
   messagingSenderId: "517446526100",
   appId: "1:517446526100:web:6d6588a0944a82c8478081"
};

//init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectAuth, projectFirestore, timestamp }