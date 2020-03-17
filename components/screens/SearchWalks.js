import React, { useEffect, useState } from "react";
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
import { db } from "../population/config";
import { withNavigation } from "react-navigation";
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

function SearchWalks(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(false);

  var usersIdAvailables = [];
  db.ref()
    .child("availability_wauwers")
    .on("child_added", snap => {
      usersIdAvailables.push(snap.val().wauwerId);
    });
  var wauwersId = Array.from(new Set(usersIdAvailables));
  var wauwers = [];
  for (let i = 0; i < wauwersId.length; i++) {
    db.ref()
      .child("wauwers/" + wauwersId[i])
      .on("value", snap => {
        wauwers.push(snap.val());
      });
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="150%" color="#443099" />
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          {wauwers ? (
            <FlatList
              data={wauwers}
              renderItem={wauwer => (
                <Wauwer wauwer={wauwer.item} navigation={navigation} />
              )}
              keyExtractor={wauwer => {
                wauwer.id;
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

function Wauwer(wauwerIn) {
  const { wauwer, navigation } = wauwerIn;
  return (
    <View style={styles.separacion}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CreateRequest", {
            wauwer: wauwer
          })
        }
      >
        <View style={styles.tarjeta}>
          <View style={styles.row}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: wauwer.photo }}
            />
            <View style={styles.column_left}>
              <Text> {wauwer.name} </Text>
              <Text> {wauwer.avgScore} </Text>
            </View>
            <View style={styles.column_right}>
              <Text> {wauwer.price} €</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(SearchWalks);

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
    //backgroundColor: "#123",
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
