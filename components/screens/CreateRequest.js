import React, { useState , useEffect} from "react";
import { StyleSheet, Text, TextInput, Button, View, Alert, Picker } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { YellowBox } from 'react-native';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



function createRequest(props) {
  const {navigation} = props;
  const newDescription= navigation.state.params.wauwer.description;
  const newPrice =navigation.state.params.wauwer.price;
  const [newDate, setNewDate] = useState(null);
  const newPending = "true";
  const [newOwner, setNewOwner] = useState([]);
  const newType = "walk";
  const newWorker= navigation.state.params.wauwer;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => { // To retrieve the current logged user
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setNewOwner(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);

  const[availabilities, setAvailabilities] = useState([]);
  
  useEffect(() => { // To retrieve the walker availabilities
    db.ref("availability-wauwers")
    .orderByChild("wauwer/id")
    .equalTo(newWorker.id)
      .on("value", snap => {
        const availabilitiesList = [];
        snap.forEach(child => {
          availabilitiesList.push(child.val().availability);
        });
        setAvailabilities(availabilitiesList);
      });
    setReloadData(false);
  }, [reloadData]);


  const all= () => {
    
    addRequest();
    Alert.alert("Éxito", "Se ha creado su solicitud correctamente.");
    navigation.navigate("Home");

  };


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
    db.ref("request/" + id)
      .set(requestData)
      .then(() => {
        setIsLoading(false);
        setReloadData(true);
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
        <Text style={styles.data}>{newWorker.name}</Text>
      </Text>
      
      <Text style={styles.text}>
        {"Información \n"} <Text style={styles.data}>{newDescription}</Text>{" "}
      </Text>
      <Text style={styles.text}>
        {"Precio paseo \n"}
        <Text style={styles.data}>{newPrice}</Text>
      </Text>

      <Text style={styles.text}>
        {"¿Cuándo quiere que " + newWorker.name + " pasee a su perro?"}
      </Text>
      
      <Picker selectedValue={newDate}
        onValueChange={value => setNewDate(value) }>

        {availabilities.map(item => 
        <Picker.Item label={item.day + " " + item.startTime + "h - " + item.endDate + "h"} value={item.day + " " + item.startTime + "h - " + item.endDate + "h"}/> )
        }
      
      </Picker>
      
      <Text style={styles.text}>
        {"Fecha\n"}
        <Text style={styles.data}>{newDate}</Text>{" "}
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
