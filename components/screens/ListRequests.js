import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { requests } from "../population/config.js";

export default function ListRequests() {
  console.log(requests[0]);
  return (
    <View>
      {requests ? (
        <FlatList
          data={requests}
          renderItem={({ request }) => <Request req={request} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View>
          <Text>No requests</Text>
        </View>
      )}
    </View>
  );
}
function Request(props) {
  const { req } = props;
  console.log(req);

  return (
    <TouchableOpacity>
      <View>
        <Text>Prueba de texto</Text>
      </View>
    </TouchableOpacity>
  );
}
