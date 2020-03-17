import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text } from "react-native";
import ListRequests from '../models/sits/ListRequests';
import { db } from '../population/config';
import { FlatList } from "react-native-gesture-handler";


export default function SearchAccommodations() {

  var requestsPending = [];
  db.ref()
  .child('request')
  .orderByChild('pending')
  .equalTo('true')
  .on('child_added', snap => {
    requestsPending.push(snap.val());
  });

  var requestsForSits = [];
  for (let i = 0; i < requestsPending.length; i++) {
    if(requestsPending[i].type == "sitter") {
      requestsForSits.push(requestsPending[i]);
    }
  }
  

  return (
    <ListRequests requestList={requestsForSits}/>
  );

  

}
