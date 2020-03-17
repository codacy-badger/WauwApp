import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import DateTimePicker from '@react-native-community/datetimepicker';
import { email } from "../account/QueriesProfile";




function CreateAccommodation(props) {
  const [newDate, setDate] = useState(new Date());
  const { id, info, pending, owner, quantity, type, worker, setIsVisibleModal, navigation } = props;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

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
  const[newWorker, setNewWorker] = useState([]);
  const [newQuantity, setNewQuantity] = useState(null);
  const newType = 'sitter';
  const newOwner = ' ';
  const [error, setError]= useState(null);
  const [isLoading, setIsLoading] = useState(false);
  




  const all= () => {
    
    addRequest();
    navigation.navigate("Home");

  }


  const addRequest = () => {
      let id= db.ref("requests").push().key;
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
      setError(null);
    if (newInfo == null || newQuantity == null) {
      console.log(newInfo);
      console.log(newQuantity);
      setError("El formulario no debe tener campos vacíos.");
      console.log(error);
    } else {
      setIsLoading(true);
      console.log('Entra')
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