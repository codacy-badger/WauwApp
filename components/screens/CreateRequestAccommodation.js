import React, { useState , useEffect} from "react";
import { StyleSheet, Text, Button, View, Alert ,ScrollView} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import _ from 'lodash';




function createRequestAccommodation(props) {
  const {navigation} = props;


  const [reloadData, setReloadData] = useState(false);
 
  const startTime = navigation.state.params.formData.startTime;
  const endTime= navigation.state.params.formData.endTime;
  
  const newStartTime = startTime.toLocaleString('en-US');
  const newEndTime = endTime.toLocaleString('en-US');

  
  
  const newIsCanceled = false;
  const newType = "sitter";
  const newPetNumber = " ";
  const newPending = true;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newWorker, setNewWorker] = useState([]);
  const [newOwner, setNewOwner] = useState([]);

  const salary = navigation.state.params.formData.salary;

  let propiedades = {
    salary: salary, 
    startTime:startTime, 
    endTime:endTime
  }

  const newPrice= Precio(propiedades);
  
  
  useEffect(() => {
    // To retrieve the current logged user
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
    db.ref("wauwers")
      .orderByChild("id")
      .equalTo(navigation.state.params.formData.worker)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setNewWorker(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);
    
    


  
 
    
  
  
   
    const all = () => {
      addRequestAccommodation();
      Alert.alert("Éxito", "Se ha creado su solicitud correctamente.");
      navigation.navigate("Home");
    };

  

    

  const addRequestAccommodation = () => {
    let id= db.ref("requests").push().key;
    setError(null);
    setIsLoading(true);
    let requestData = {
      id: id,
      pending: newPending,
      owner: newOwner.id,
      price: newPrice,
      type: newType,
      isCanceled: newIsCanceled,
      startTime : startTime,
      endTime: endTime,
      worker: newWorker.id,
      petNumber: newPetNumber
    };
    console.log(requestData);
    
      // setIsLoading(true);
         
      // db.ref("request/" + id)
      // .set(requestData)
      // .then(() => {
      //   setIsLoading(false);
      //   setReloadData(false);
      //   setIsVisibleModal(false);
      //     })
      // .catch(() => {
      //   setError("Ha ocurrido un error");
      //   setIsLoading(false);
      //     });
          
        
      
    };
  
 
  return (
    <ScrollView style={{backgroundColor:"white"}}>

      <Text style={styles.text}>
        {"Nombre Cuidador\n"}
         <Text style={styles.data}>{newWorker.name}</Text> 
      </Text>
      <Text style={styles.text}>
        {"Descripcion Cuidador \n"}
        <Text style={styles.data}>{newWorker.description}</Text> 
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
        <Precio
              salary={salary}
              startTime={startTime}
              endTime= {endTime}
            />
      </Text>
      

      <View style={styles.buttonContainer}>
        <Button title="Crear Solicitud" onPress={all} color="#0de" />
      </View>

      </ScrollView>
  );
}



export default withNavigation(createRequestAccommodation);

function Precio (props){
  const {salary, startTime, endTime} = props
  const duration = endTime.getDate() - startTime.getDate();
  const newPrice= salary * duration;
  console.log(newPrice);
  return newPrice;
  
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
