import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyCxDtD1GE3SpEKUkamwJPunBJEIGAzkLak",
  authDomain: "webtest-69f07.firebaseapp.com",
  databaseURL: "https://webtest-69f07.firebaseio.com",
  projectId: "webtest-69f07",
  storageBucket: "webtest-69f07.appspot.com",
  messagingSenderId: "433831165697",
  appId: "1:433831165697:web:a671f0152121741c9da500",
  measurementId: "G-R10C3C65EM"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;

