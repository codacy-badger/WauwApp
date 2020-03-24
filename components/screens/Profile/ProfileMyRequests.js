import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { Button, Avatar, Rating, Card, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { globalStyles } from "../../styles/global";
import { FontAwesome } from "@expo/vector-icons";

function ProfileMyRequests(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [requestsList, setRequestList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  var requests = [];

  var worker = [];

  var wauwerId = "";


  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      wauwerId = snap.val().id;
    });

  console.log(wauwerId);


  db.ref("request")
    .orderByChild("ownerId")
    .equalTo(wauwerId)
    .on("child_added", snap => {
      requests.push(snap.val());
    });

  console.log(requests);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <TouchableOpacity
        style={{ alignItems: "flex-end", margin: 16 }}
        onPress={navigation.openDrawer}
      >
        <FontAwesome name="bars" size={24} color="#161924" />
      </TouchableOpacity>
      <ScrollView>
        {requests ? (
          <FlatList
            data={requests}
            renderItem={request => (
              <Request request={request.item} navigation={navigation} />
            )}
            keyExtractor={request => {
              request.id;
            }}
          />
        ) : (
            <View>
              <Text> No hay solicitudes </Text>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Request(requestIn) {
  const { request, navigation } = requestIn;

  var tipo = "";
  var status = "";

  if (request.type == "SITTER") {
    tipo = "Alojamiento";
  } else {
    tipo = "Paseo";
  }

  if (request.pending && !request.isCanceled) {
    status = "Pendiente de aceptación";
  } else if (!request.pending && request.isCanceled) {
    status = "Denegada";
  } else {
    status = "Aceptada";
  }

  return (
    <View style={styles.separacion}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ShowRequest", {
            request: request
          })
        }
      >
        <View style={styles.tarjeta}>
          <View style={styles.row}>
            <View style={styles.column_left}>
              <Text> Num mascotas: {request.petNumber} </Text>
              <Text> {status} </Text>
            </View>
            <View style={styles.column_right}>
              <Text> {request.price} €</Text>
              <Text> {tipo} </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(ProfileMyRequests);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  column_left: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 20
  },
  column_right: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 20
  },
  tarjeta: {
    elevation: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    borderStyle: "solid"
  },
  separacion: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  loading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
