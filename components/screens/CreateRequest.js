import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View, Image } from "react-native";

export default function createRequest(props) {
  console.log(props);
  const {userInfo} = props;
  const {
    id,
    avgScore,
    description,
    dni,
    name,
    paypalURL,
    petNumber,
    photo,
    surname,
    wauwPoint,
    price,
    email
  }= '';

  //const {date, info, pending, owner, quantity, type, worker};
  const newDate = '';
  const newPending = "true";
  //const [newInfo, setNewInfo] = useState(null);
  const newOwner = " ";
 //const [newQuantity, setNewQuantity] = useState(null);
  const newType = "walk";
  const newWorker = " ";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addRequest = () => {
    let id= db.ref("requests").push().key;
    setError(null);
    setIsLoading(true);
    let requestData = {
      date: newDate,
      info: description,
      pending: newPending,
      owner: newOwner,
      quantity: price,
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
        <Text style={styles.data}>{userInfo.navigation.state.params.wauwer.name}</Text>
      </Text>
      <Text style={styles.text}>
        {"Fecha\n"}
        <Text style={styles.data}>{newDate}</Text>{" "}
      </Text>
      <Text style={styles.text}>
        {"Información \n"} <Text style={styles.data}>{description}</Text>{" "}
      </Text>
      <Text style={styles.text}>
        {"Precio paseo \n"}
        <Text style={styles.data}>{price}</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Crear Solicitud" onPress={addRequest} color="#0de" />
      </View>
    </View>
  );
}

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
