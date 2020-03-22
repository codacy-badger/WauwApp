import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import DateTimePicker from '@react-native-community/datetimepicker';
import { email } from "../account/QueriesProfile";
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



function CreateAccommodation(props) {
  const [newDate, setDate] = useState(new Date());
  const { id, info, pending, owner, quantity, type, worker, setIsVisibleModal, navigation } = props;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate.toISOstring());

  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
    
  };

  const showDatepicker = () => {
    showMode('date');
  };




  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setNewWorker(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);


  const newPending = 'true';
  const [newInfo, setNewInfo] = useState(null);
  const [newWorker, setNewWorker] = useState([]);
  const [newQuantity, setNewQuantity] = useState(null);
  const newType = 'sitter';
  const newOwner = ' ';
  //const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  




  //TODO: modificar para borrar el historial de la navegación
  const all= () => {
    
    addRequest();
    
    

  }


  const addRequest = () => {
      let id= db.ref("request").push().key;
      setIsLoading(true);
      let requestData = {
        id: id,
        date: newDate,
        info: newInfo,
        pending: newPending,
        owner: newOwner,
        quantity: newQuantity,
        type: newType,
        worker: newWorker,

      };
      
    if (newInfo === null || newQuantity === null || newDate <= new Date()) {
      let errores = '';
      if (newInfo === null){
        errores = errores.concat("Debe escribir la información sobre el alojamiento.\n");
      }
      if (newQuantity === null){
        errores = errores.concat("Debe escribir el precio para el alojamiento.\n");
      }
      if (!Number.isNaN(newQuantity) && newQuantity < 10){
        errores = errores.concat("El precio mínimo es 10.\n");
      }
      /* if (){
        errores = errores.concat("Debe ser una cantidad entre 5 y 100, sin €.\n");
      } */
      //setError("El formulario no debe tener campos vacíos.");
      if (newDate <= new Date()){
        //setError("La fecha debe ser posterior a la actual.");
        errores = errores.concat("La fecha debe ser posterior a la actual.\n");
      }
      Alert.alert("Advertencia", errores.toString());
    }else {
      
      let errores = '';
      if (!Number.isNaN(newQuantity) && newQuantity < 10){
        errores = errores.concat("El precio mínimo es 10.\n");
        if (newDate <= new Date()){
          errores = errores.concat("La fecha debe ser posterior a la actual.\n");
        }
        Alert.alert("Advertencia", errores.toString());
      }else{
        setIsLoading(true);
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
          Alert.alert("Éxito", "Se ha registrado el alojamiento correctamente.");
          navigation.navigate("Services");
      }
    }
  };
 
  return (
    <View style={styles.view} >
      <Text> Crea tu alojamiento </Text>
            <View >
              <Text>Fecha</Text>
              <View>
                  <View>
                    <Button onPress={showDatepicker} title="Fecha de entrada" />
                  </View>
                  
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      timeZoneOffsetInMinutes={0}
                      value={newDate}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
              </View>
              <Text>Información de alojamiento</Text>
              <TextInput
              placeholder="Introduce aquí la información"
              containerStyle={styles.input}
              onChange={v => setNewInfo(v.nativeEvent.text)}
              />
              <Text>Precio total</Text>
              <TextInput
              placeholder="10.00"
              keyboardType= 'numeric'
              containerStyle={styles.input}
              
              onChange={v => setNewQuantity(v.nativeEvent.text)}
              
              />
            <Button 
            title= 'Crear'
            onPress= {all}
            loading={isLoading}
            /> 
            </View>  
    </View>
  );
}

export default withNavigation(CreateAccommodation);

const styles =
      
      StyleSheet.create({
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