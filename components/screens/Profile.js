import React from "react";
import { StyleSheet, View, Text, Button, ScrollView, SafeAreaView } from "react-native";
import firebase from 'firebase';
import UserGuest from "../account/UserGuest";


export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView scrollEventThrottle={16}>
    <View style={styles.viewStyle}>
    <UserGuest />
    </View>
    <View style={{flex:1, paddingTop:20, paddingHorizontal:20}}>
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
