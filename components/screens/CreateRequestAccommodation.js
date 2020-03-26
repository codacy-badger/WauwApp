import React, { useState , useEffect} from "react";
import { StyleSheet, Text, TextInput, Button, View, Alert } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { CheckBox } from 'react-native-elements';
import DateTimePicker from "@react-native-community/datetimepicker";


YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



function createRequestAccommodation(props) {
  const {navigation, setIsVisibleModal} = props;
  console.log(props);


  const [reloadData, setReloadData] = useState(false);

  const[newOwner, setNewOwner] = useState([]);
  const newWorker = " ";

  useEffect(() => {
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



  // useEffect(() => {
  //   db.ref("wauwers").child("id").equalTo(navigation.state.params.accommodation.worker)
  //   .on( "value" ,  snap => {
  //     setNewWorker(snap.val())
  //   });
  //   });

    console.log(newOwner);

    
  //const newPlace= newWorker.place;
  const[newPrice, setNewPrice] = useState([]);
 
   
  const newStartTime= new Date(navigation.state.params.startTime);
  const newEndTime= new Date(navigation.state.params.endTime);
  
  const newIsCanceled = false;
  const newType = "walk";
  const newPetNumber = " ";
  const newPending = true;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


    duration = newEndTime.getDate() - newStartTime.getDate();
    salary = navigation.state.params.formData.salary;
    
    setNewPrice(salary * duration);


  


  const addRequestAccommodation = () => {
    let id= db.ref("requests").push().key;
    setError(null);
    setIsLoading(true);
    let requestData = {
      id: id,
      pending: newPending,
      owner: newOwner,
      price: newPrice,
      type: newType,
      isCanceled: newIsCanceled,
      place: newPlace,
      startTime : newStartTime,
      endTime: newEndTime,
      worker: newWorker,
      petNumber: newPetNumber
    };

      setIsLoading(true);
         
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
          Alert.alert("Éxito", "Se ha solicitado el alojamiento correctamente.");
          navigation.navigate("Services");
        
      
    };
  


  return (
    <View style={styles.view}>

      <Text style={styles.text}>
        {"Nombre Cuidador\n"}
        {/* <Text style={styles.data}>{newWorker.name}</Text> */}
      </Text>
      <Text style={styles.text}>
        {"Descripcion Cuidador \n"}
        {/* <Text style={styles.data}>{newWorker.description}</Text> */}
      </Text>
      <Text style={styles.text}>
        {"Fecha de inicio\n"}
        <Text style={styles.data}>{newStartTime}</Text>{" "}
      </Text>
      <Text style={styles.text}>
        {"Fecha de inicio\n"}
        <Text style={styles.data}>{newEndTime}</Text>{" "}
      </Text>
      <Text style={styles.text}>
        {"Precio Total Alojamiento \n"}
        <Text style={styles.data}>{newPrice}</Text>{" "}
      </Text>
      

      <View style={styles.buttonContainer}>
        <Button title="Crear Solicitud" onPress={addRequestAccommodation} color="#0de" />
      </View>

    </View>
  );
}


export default withNavigation(createRequestAccommodation);

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
