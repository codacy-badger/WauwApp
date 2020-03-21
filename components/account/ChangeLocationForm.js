import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { db } from "../population/config.js";

export default function ChangeLocationForm(props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.view}>
      <Button
        title="Cambiar localización"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        loading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680",
    borderRadius: 18
  }
});
