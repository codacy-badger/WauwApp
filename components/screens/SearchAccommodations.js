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

  var accommodations = [];
  db.ref()
  .child('accommodation')
  .on('child_added', snap => {
    accommodations.push(snap.val());
  });

  return (
    <ListAccommodations accList={accommodations}/>
  );

  

}
