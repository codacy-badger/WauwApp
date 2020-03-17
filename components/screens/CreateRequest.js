import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View, Image } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";



function createRequest(props) {
  const {navigation} = props;


  const newDescription= navigation.state.params.wauwer.description;
  const newPrice =navigation.state.params.wauwer.price;
  const newDate = '   ';
  const newPending = "true";
  const newOwner = " ";
  const newType = "walk";
  const newWorker = " ";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const all= () => {
    
    addRequest();
    navigation.navigate("Home");

  }


  const addRequest = () => {
    let id= db.ref("requests").push().key;
    setError(null);
    setIsLoading(true);
    let requestData = {
      id: id,
      date: newDate,
      info: newDescription,
      pending: newPending,
      owner: newOwner,
      quantity: newPrice,
      type: newType,
      worker: newWorker
    };
    console.log(requestData);
    db.ref("request/" + id)
      .set(requestData)
      .then(() => {
        setIsLoading(false);
        setReloadData(false);
        setIsVisibleModal(false);
      })
      .catch(() => {
        setError("Ha ocurrido un error");
        setIsLoading(false);
      });
  };

  return (
    <View>
      <Text style={styles.text}>
        {"Nombre Paseador\n"}
        <Text style={styles.data}>{navigation.state.params.wauwer.name}</Text>
      </Text>
      <Text style={styles.text}>
        {"Fecha\n"}
        <Text style={styles.data}>{newDate}</Text>{" "}
      </Text>
      <Text style={styles.text}>
        {"Información \n"} <Text style={styles.data}>{newDescription}</Text>{" "}
      </Text>
      <Text style={styles.text}>
        {"Precio paseo \n"}
        <Text style={styles.data}>{newPrice}</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Crear Solicitud" onPress={all} color="#0de" />
      </View>
    </View>
  );
}


export default withNavigation(createRequest);

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  data: {
    paddingHorizontal: 8,
    paddingVertical: 9,
    color: "grey"
  },
  buttonContainer: {
    marginTop: 40
  },
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
    backgroundColor: "#00a680"
  }
});
