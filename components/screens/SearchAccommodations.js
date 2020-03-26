import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Image } from "react-native-elements";
import { db } from "../population/config.js";

export default function ListAccommodations(props) {
  const { navigation } = props;
  const [accommodationsList, setAccommodationList] = useState([]);
  const [wauwersList, setWauwersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.ref("accommodation")
      .orderByChild("isCanceled")
      .equalTo(false)
      .on("value", snap => {
        const accommodations = [];
        snap.forEach(child => {
          accommodations.push(child.val());
        });
        setAccommodationList(accommodations);
      });
  }, []);

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );

  if (loading) {
    return (
      <View>
        <Text> Cargando... </Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          {requestList ? (
            <FlatList
              data={requestList}
              renderItem={request => <Request request={request.item} />}
              keyExtractor={request => {
                request.id;
              }}
            />
          ) : (
            <View>
              <Text> No hay usuarios </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function Accommodation(props) {
  const { accommodation, navigation } = props;
  let worker;
  db.ref("wauwers")
    .child(accommodation.item.worker)
    .on("value", snap => {
      worker = snap.val();
    });

  return (
    <View style={styles.separacion}>
      <TouchableOpacity
      //TODO: reparar esto para que navegue a la página adecuada
       /* onPress={() =>
         navigation.navigate("CreateAccommodation", {
           accommodation: accommodation.item
       })
      } */
      >
        <View style={styles.tarjeta}>
          <View style={styles.row}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: worker.photo }}
            />

            <View style={styles.column_left}>
              <Text> {worker.description} </Text>
            </View>
            <View style={styles.column_right}>
              <Text> {accommodation.item.salary} €</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

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
    backgroundColor: "#fff",
    borderRadius: 25,
    borderStyle: "solid"
  },
  separacion: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  }
});
