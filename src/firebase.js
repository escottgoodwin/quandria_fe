import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyAU9rdHnQ8H5LcAGfX_zG8ALGbIteBRASw",
    authDomain: "quandria-7bfca.firebaseapp.com",
    databaseURL: "https://quandria-7bfca.firebaseio.com",
    projectId: "quandria-7bfca",
    storageBucket: "quandria-7bfca.appspot.com",
    messagingSenderId: "185582499906"
  };

firebase.initializeApp(config);
const settings = { timestampsInSnapshots: true};
var firestore = firebase.firestore();
firestore.settings(settings);

export const challengesRef = firestore.collection("challenges")
export const classRef = firestore.collection("class")
export const institutionRef = firestore.collection("institution")
export const q_msgsRef = firestore.collection("q_msgs")
export const qpanelsRef = firestore.collection("qpanels")
export const questionsRef = firestore.collection("questions")
export const test_cycleRef = firestore.collection("test_cycle")
export const usersRef = firestore.collection("users")
export const storageRef = firebase.storage().ref();
