import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import {Formik} from "formik";
import { db } from "../population/config.js";

export default function CreateAccommodation(props) {
  //const worker = await firebase.auth().currentUser;

  const [newDate, setNewDate] = useState(null);
  const newPending = useState('true');
  const [newInfo, setNewInfo] = useState(null);
  const newOwner = useState(null);  
  const [newQuantity, setNewQuantity] = useState(null);
  const newType = useState('accommodation');
  const newWorker = useState('worker3');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id,date, info, pending, owner,quantity,type,worker, setIsVisibleModal, setReloadData } = props;



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
      db.ref("requests")
        .child(id)
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
    <View >
      <Text> Crea tu alojamiento </Text>
      <Formik
        
          onSubmit={(values) => {
            console.log(values)
            addRequest()
            
          }}>
           

          {(props) =>(
            <View style={styles.container}>
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
            onPress= {props.handleSubmit}
            loading={isLoading}
            /> 
            </View>
          )}

      </Formik>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  }
  

});