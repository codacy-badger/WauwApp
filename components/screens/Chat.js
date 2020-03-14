import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import Anganga from "../request/Testeo";
import { requests } from "../population/config.js";
import ListRequest from "./ListRequests";
import { db } from "../population/config.js";

export default function Chat() {
  // console.log(requests[0].info);
  //const [requests, setRequests] = useState([]);
  const [startRequests, setStartRequests] = useState(null);
  const [totalRequests, setTotalRequests] = useState(0);
  const limitRequests = 8;

  // useEffect(() => {
  //   db.ref("requests").on("value", function(snap) {
  //     setTotalRequests(snap.numChildren());
  //   });
  //   async () => {
  //     const requests = [];

  //     const requests = db
  //       .ref("requests")
  //       .orderByChild("date")
  //       .limitToLast(limitRequests);
  //   };
  // }, []);
  const re = [];
  requests.forEach(r => re.push(r));
  //console.log(requests);
  const a = ["ee", "qq"];

  return (
    <View>
      <ListRequest reqList={re} />
    </View>
  );
}
