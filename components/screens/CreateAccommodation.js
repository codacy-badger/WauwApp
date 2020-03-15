import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { db } from "../population/config.js";

export default function CreateAccommodation(props) {
  //const worker = await firebase.auth().currentUser;

  const { id,date, info, pending, owner,quantity,type,worker, setIsVisibleModal, setReloadData } = props;

  const [newDate, setNewDate] = useState(null);
  const newPending = 'true';
  const [newInfo, setNewInfo] = useState(null);
  const newOwner = '';  
  const [newQuantity, setNewQuantity] = useState(null);
  const newType = 'sitter';
  const newWorker = ' ';
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  


  const addRequest = () => {
      setError(null);
      setIsLoading(true);
      let requestData = {
        date: newDate,
        info: newInfo,
        pending: newPending,
        owner: newOwner,
        quantity: newQuantity,
        type: newType,
        worker: newWorker,

      };
      console.log(requestData)
      db.ref("requests")
        .push(requestData)
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
    <View style={styles.view} >
      <Text> Crea tu alojamiento </Text>
            <View >
              <Text>Fecha</Text>
              <TextInput
              placeholder="dd/MM/aaaa"
              containerStyle={styles.input}
              defaultValue={date && date}
              onChange={v => setNewDate(v.nativeEvent.text)}
              rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
              }}
              errorMessage={error}
              />
              <Text>Informacion de alojamiento</Text>
              <TextInput
              containerStyle={styles.input}
              defaultValue={info && info}
              onChange={v => setNewInfo(v.nativeEvent.text)}
              rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
              }}
              errorMessage={error}
              />
              <Text>Precio total</Text>
              <TextInput
              keyboardType= 'numeric'
              containerStyle={styles.input}
              defaultValue={quantity && quantity}
              onChange={v => setNewQuantity(v.nativeEvent.text)}
              rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
              }}
              errorMessage={error}
              />
            <Button 
            title= 'Crear'
            onPress= {addRequest}
            loading={isLoading}
            /> 
            </View>
          
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
    backgroundColor: "#00a680"
  }
});