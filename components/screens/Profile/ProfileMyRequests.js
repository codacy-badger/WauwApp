import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
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

  let wauwerId;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      wauwerId = snap.val().id;
    });

  useEffect(() => {
    db.ref("requests")
      .orderByChild("owner")
      .equalTo(wauwerId)
      .on("value", snap => {
        const requests1 = [];
        snap.forEach(child => {
          requests1.push(child.val());
        });
        setRequestList(requests1);
      });
    setReloadData(false);
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <TouchableOpacity
        style={{ alignItems: "flex-end", margin: 16 }}
        onPress={navigation.openDrawer}
      >
        <FontAwesome name="bars" size={24} color="#161924" />
      </TouchableOpacity>
      <ScrollView>
        {requestsList ? (
          <FlatList
            data={requestsList}
            renderItem={request => (
              <Request request={request} navigation={navigation} />
            )}
            keyExtractor={request => request.id}
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
  console.log(request);

  let tipo = "";
  let status = "";
  let fondo = "white";

  if (request.item.pending) {
    status = "Pendiente de aceptación";
    fondo = "rgba(255,128,0,0.6)";
  } else {
    switch (request.item.isCanceled) {
      case false:
        status = "Aceptada";
        fondo = "rgba(0,128,0,0.6)";
        break;
      case true:
        status = "Denegada";
        fondo = "rgba(255,0,0,0.6)";
        break;
      default:
        break;
    }
  }

  if (request.item.type == "SITTER") {
    tipo = "Alojamiento";
  } else if (request.item.type == "WALK") {
    tipo = "Paseo";
  }

  const tarjeta = {
    elevation: 1,
    backgroundColor: fondo,
    borderRadius: 25,
    borderStyle: "solid"
  };

  // const changeBgColor = {
  //   borderRadius: 6,
  //   elevation: 3,
  //   backgroundColor: fondo,
  //   shadowOffset: { width: 1, height: 1 },
  //   shadowColor: "#333",
  //   shadowOpacity: 0.3,
  //   shadowRadius: 2,
  //   marginHorizontal: 4,
  //   marginVertical: 6,
  //   flex: 1,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   padding: 10
  // };

  return (
    <View style={styles.separacion}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ShowRequest", {
            request: request.item
          })
        }
      >
        <View style={tarjeta}>
          <View style={styles.row}>
            <View style={styles.column_left}>
              <Text> Num mascotas: {request.item.petNumber} </Text>
              <Text> {status} </Text>
            </View>
            <View style={styles.column_right}>
              <Text> {request.item.price} €</Text>
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
