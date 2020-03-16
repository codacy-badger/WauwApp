import { db } from "../population/config.js";
import * as firebase from 'firebase';

export const users = [];
var email = '';
firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    email = user.email;
  }
});

db.ref("wauwers").orderByChild("id").startAt(email).on("value", function(snap){
  snap.forEach(function(child){
      users.push(child.val());
  });
});