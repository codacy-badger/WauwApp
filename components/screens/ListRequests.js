import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { requests } from "../population/config.js";

export default function ListRequests(props) {
  const { reqList } = props;

  return (
    <View>
      {props ? (
        <FlatList
          data={props}
          renderItem={({ request }) => (
            <Request
              id={request.id}
              owner={request.owner}
              worker={request.worker}
              info={request.info}
            />
          )}
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
  // const { requ } = props;
  // const { id, owner, worker, info } = requ.item.requ;
  // console.log(id);

  return (
    <TouchableOpacity>
      <View>
        <Text>Prueba de texto</Text>
      </View>
    </TouchableOpacity>
  );
}
