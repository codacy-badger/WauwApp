import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { requests } from "../population/config.js";
import ListRequest from "./ListRequests";

export default function Chat() {
  console.log(requests);

  return (
    <View>
      <ListRequest reqList={requests} />
    </View>
  );
}
