import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import firebase from 'firebase';

export default function Profile() {
  return (
    <View style={{flex:1, paddingTop:20, paddingLeft:20,  paddingRight:20}}>
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
  }
});
