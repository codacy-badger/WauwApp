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

function ProfileMyAccommodations(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [accommodationsList, setAccommodationsList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  let wauwerId;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      wauwerId = snap.val().id;
    });

  useEffect(() => {
    db.ref("accommodation")
      .orderByChild("worker")
      .equalTo(wauwerId)
      .on("value", snap => {
        const accommodations = []; 
        snap.forEach(child => {
          var endTime = new Date(child.val().endTime);
          if(endTime > new Date()){
            accommodations.push(child.val());
          }
        });
        setAccommodationsList(accommodations);
      });
    setReloadData(false);
    setLoading(false);
  }, [reloadData]);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Mis Alojamientos</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
     
        {accommodationsList ? (
          <FlatList
            data={accommodationsList}
            renderItem={accommodation => (
              <Accommodation
                accommodation={accommodation}
                navigation={navigation}
              />
            )}
            keyExtractor={accommodation => accommodation.id}
          />
        ) : (
          <View>
            <Text> No hay alojamientos </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}


function Accommodation(accomodationIn) {
  const { accommodation, navigation } = accomodationIn;
  let status = "";
  let fondo = "white";
  let editable = false;
  var startTime = new Date(accommodation.item.startTime);

  if (startTime < new Date()) {
    status = "en curso";
  } else {
    switch (accommodation.item.isCanceled) {
      case true:
        status = "ocupado para la fecha establecida";
        fondo = "rgba(0,128,0,0.6)";
        break;
      case false:
        status = "esperando solicitudes";
        fondo = "rgba(255,128,0,0.6)";
        editable = true;
        break;
      default:
        break;
    }
  }

  const tarjeta = {
    elevation: 1,
    backgroundColor: fondo,
    borderRadius: 25,
    borderStyle: "solid"
  };

  return (
    <View style={styles.separacion}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EditDeleteAccommodation", {
            accommodation: accommodation.item, editable: editable
          })
        }
      >
        <View style={tarjeta}>
          <View style={styles.row}>
            <View style={styles.column_left}>
              <Text>Alojamiento {status}</Text>
            </View>
            <View style={styles.column_right}>
              <Text>{(accommodation.item.salary*0.8).toFixed(2)} €</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(ProfileMyAccommodations);

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
