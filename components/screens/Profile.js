import React from "react";
import UserGuest from "../account/UserGuest";
import {Button, StyleSheet, View } from 'react-native'

export default function Profile() {
  return (
    <View style={styles.viewStyle}>
      <UserGuest />
      <Button
        buttonStyle={styles.btnStyle}
        containerStyle={styles.btnContainer}
        title="Salir de mi sesión"
        onPress={() => firebase.auth().signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#ff7549"
  },
  btnContainer: {
    backgroundColor: "#ff7549"
  },
  viewStyle: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
});
