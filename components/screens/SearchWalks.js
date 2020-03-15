import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import "./../models/Wauwer";
import {db} from "../population/config.js";

export var wauwers = [];

export default function SearchWalks(props) {
  const { wauwers, navigation, walkId, setRating } = props;


  const traePaseos = () => {
    db.ref("wauwers").limitToFirst;

  }
  console.log(traePaseos.length);

  return (
    <View>
      <FlatList
        data={wauwers}
        renderItem={wauwer => <Wauwer wauwer={wauwer} navigation={navigation} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );

}
