import React from "react";
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import firebase from "firebase";
import UserGuest from "../account/UserGuest";
import { Button } from "react-native-elements";
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.viewStyle}>
          <UserGuest />
        </View>
        <View>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Cerrar sesión"
            onPress={() => firebase.auth().signOut()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#ff7549",
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer: {
    backgroundColor: "#ff7549",
    marginTop: 30,
    marginRight: 20,
    marginLeft: 20
  },
  viewStyle: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
});
