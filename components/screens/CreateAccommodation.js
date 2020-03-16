import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import DateTimePicker from '@react-native-community/datetimepicker';

function CreateAccommodation(props) {
  const [newDate, setDate] = useState(new Date());
  const { id, info, pending, owner, quantity, type, worker, setIsVisibleModal, setReloadData, navigation } = props;
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);

  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
    
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };



  const newPending = 'true';
  const [newInfo, setNewInfo] = useState(null);
  const newOwner = '';  
  const [newQuantity, setNewQuantity] = useState(null);
  const newType = 'sitter';
  const newWorker = ' ';
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const all= () => {
    
    addRequest();
    navigation.navigate("Home");

  }

 

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
              <View>
                  <View>
                    <Button onPress={showDatepicker} title="Show date picker!" />
                  </View>
                  <View>
                    <Button onPress={showTimepicker} title="Show time picker!" />
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