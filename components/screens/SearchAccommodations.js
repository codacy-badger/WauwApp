import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text } from "react-native";
import ListWauwers from '../models/sits/ListWauwers';
import { db } from '../population/config';
import { FlatList } from "react-native-gesture-handler";


export default function SearchAccommodations() {

  var usersIdAvailables = [];
  db.ref()
  .child('availability_wauwers')
  .on('child_added', snap => {
    usersIdAvailables.push(snap.val().idWauwer);
  });

  var wauwersId = Array.from(new Set(usersIdAvailables));
  var wauwers = [];
  for (let i = 0; i < wauwersId.length; i++) {
    db.ref().child('wauwers/' + wauwersId[i])
    .on('value', snap => {
      wauwers.push(snap.val());
    });
  };

  return (
    <ListWauwers wauwerList={wauwers}/>
  );

  

}
