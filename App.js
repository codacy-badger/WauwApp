import React from "react";
import * as firebase from "firebase";
import Navigation from "./app/navigations/Navigation";

// Initialize Firebase
//TODO: Inciar sesión en Google Firebase con la cuenta que Andrea creó y obtener los siguientes datos
const firebaseConfig = {
  apiKey: "<YOUR-API-KEY>",
  authDomain: "<YOUR-AUTH-DOMAIN>",
  databaseURL: "<YOUR-DATABASE-URL>",
  storageBucket: "<YOUR-STORAGE-BUCKET>"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  return <Navigation />;
}
