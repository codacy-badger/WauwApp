import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import ListWauwers from "../models/walks/ListWauwers";
import { db } from "../population/config";

export default function SearchWalks() {
  // QUERY --------------------------------------------------------------------
  /* var wauwers = [];
  db.ref().child('wauwers').orderByKey().on('child_added', (snap) => {
    wauwers.push(snap.val());
  }); */

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
  }
  console.log(wauwers);
  return (
   <View>
      <ListWauwers wauwerList = {wauwers}/>
    </View>
  );
}

