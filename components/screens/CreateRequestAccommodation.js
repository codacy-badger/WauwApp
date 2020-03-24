import React, { useState , useEffect} from "react";
import { StyleSheet, Text, TextInput, Button, View, Image } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { CheckBox } from 'react-native-elements'

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



function createRequestAccommodation(props) {
  const {navigation} = props;
  
  const newPlace= newWorker.place;
  const[newPrice, setNewPrice] = useState([]);
  const newStartTime = useState(null);;
  const newEndTime = useState(null);;
  const [newPetNumber, setNewPetNumber] = useState([]);

  const[newOwner, setNewOwner] = useState([]);
  const[newWorker, setNewWorker] = useState([]);
  
  const newIsCanceled = false;
  const newType = "walk";
  const newPending = true;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);

    
  const calcularPrecio = () => {

    duration = newEndTime.getDate() - newStartTime.getDate();
    salary = navigation.state.params.accommodation.salary;
    
    setNewPrice(salary * duration);
  }
  


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



  useEffect(() => {
    db.ref("wauwers").child("id").equalTo(navigation.state.params.worker)
    .on( "value" ,  snap => {
      setNewWorker(snap.val())
    });

    });


  const all= () => {
      
    calcularPrecio();
    addRequest();
    navigation.navigate("Home");

  }


  const addRequest = () => {
    let id= db.ref("requests").push().key;
    setError(null);
    setIsLoading(true);
    let requestData = {
      id: id,
      pending: newPending,
      owner: newOwner,
      price: newPrice,
      type: newType,
      worker: newWorker,
      isCanceled: newIsCanceled,
      place: newPlace,
      startTime : newStartTime,
      endTime: newEndTime
    };
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

      <Text style={styles.text}>
      {"Selecciona la/s mascota/s que desea que sean cuidadas\n"}
      <CheckBox
      title='Mascotas'
      checked={this.state.checked}
      />
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Crear Solicitud" onPress={all} color="#0de" />
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
