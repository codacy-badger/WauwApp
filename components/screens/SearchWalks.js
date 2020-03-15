import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import ListWauwers from "../models/walks/ListWauwers";
import { db } from "../population/config";

export default function SearchWalks() {
  // QUERY --------------------------------------------------------------------
  var wauwers = [];
  db.ref().child('wauwers').orderByKey().on('child_added', (snap) => {
    wauwers.push(snap.val());
  });

  return (
   <View>
      <ListWauwers wauwerList = {wauwers}/>
    </View>
  );
}

