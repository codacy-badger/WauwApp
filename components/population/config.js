import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCzMdhztBBX0fL49fbaI7Q1Lx99vmvrMbE",
    authDomain: "wauw-ispp.firebaseapp.com",
    databaseURL: "https://wauw-ispp.firebaseio.com",
    projectId: "wauw-ispp",
    storageBucket: "wauw-ispp.appspot.com",
    messagingSenderId: "23003798547",
    appId: "1:23003798547:web:e206a345f8c469c160b3e6",
    measurementId: "G-MEPM4LGR4N"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Para queries que no están puestas en ningún lado, usad la variable db
export var db = app.database();

// Custom queries
// Get all owners
export var owners = [];
db.ref()
  .child("owners")
  .orderByChild("id")
  .on("value", snap => {
    owners = snap.val();
  });

// Get all walkers
export var walkers = [];
db.ref()
  .child("walkers")
  .orderByChild("id")
  .on("value", snap => {
    walkers = snap.val();
  });

//Get all requests
export let requests = [];
db.ref("pruebasRequests")
  .orderByChild("pending")
  .equalTo(true)
  .on("value", function(snap) {
    snap.forEach(function(child) {
      requests.push(child.val());
    });
  });

// export let requests = [];
// db.ref()
//   .child("requests")
//   .orderByChild("date")
//   .on("child_added", snap => {
//     requests.push(snap.val());
//   });
db.ref().child('walkers').orderByChild('id').on('value', snap => {
  walkers = snap.val();
});

// Get all wauwers
export let wauwers = [];
db.ref().child('wauwers').orderByChild('id').on('child_added', snap => {
  wauwers = snap.val();
});
