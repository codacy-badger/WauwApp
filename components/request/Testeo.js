import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { db } from "../population/config";

export default function Testeo(props) {
  const subeRequest = () => {
    let id = db.ref("pruebasRequests").push().key;
    let date = new Date();
    db.ref("pruebasRequests/" + id).set({
      date:
        date.getUTCDate() +
        "/" +
        (date.getUTCMonth() + 1) +
        "/" +
        date.getFullYear(),
      id: id,
      info: "Chiguagua",
      owner: "owner3",
      pending: true,
      quantity: 1,
      type: "walk",
      worker: "worker3"
    });
  };

  return (
    <View style={styles.request}>
      <View style={styles.requestContent}>
        <Text>Request de: Propietario random</Text>
        <Text>Request hacia: Paseador random</Text>
        <Text>Mascota: Pitbull</Text>
        <Button title="CREAR REQUEST" onPress={subeRequest} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  request: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6
  },
  requestContent: {
    marginHorizontal: 18,
    marginVertical: 10
  },
  btn: {}
});
