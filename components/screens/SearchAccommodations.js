import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text } from "react-native";
import ListAccommodations from '../models/sits/ListAccommodations';
import { db } from '../population/config';
import { FlatList } from "react-native-gesture-handler";
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

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
    <ListAccommodations requestList={requestsForSits}/>
  );

  

}
