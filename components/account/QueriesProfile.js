import { db } from "../population/config.js";
import * as firebase from 'firebase';

export var email = '';
firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    email = user.email;
  }
});