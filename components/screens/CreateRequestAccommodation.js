import React, { useState , useEffect} from "react";
import { StyleSheet, Text, Button, View, Alert ,ScrollView} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import _ from 'lodash';




function createRequestAccommodation(props) {
  const {navigation} = props;


  const [reloadData, setReloadData] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
 

  //Atributos del props
  const newIdAccommodation =navigation.state.params.formData.idAccommodation;
  const startTime = navigation.state.params.formData.startTime;
  const endTime= navigation.state.params.formData.endTime;
  const newPetNumber = navigation.state.params.formData.petNumber ;
  
  //Poner fechas medianamente bonitas
  const newStartTime = startTime.toLocaleString('en-US');
  const newEndTime = endTime.toLocaleString('en-US');


  //Atributos definidos
  
  const newIsCanceled = false;
  const newType = "sitter";
  const newIsPayed = false;

 
  const newPending = true;

  //Worker y owner

  const [newWorker, setNewWorker] = useState([]);
  const [newOwner, setNewOwner] = useState([]);


  //Calcular el precio total del alojamiento

  // let propiedades = {
  //   salary: salary, 
  //   startTime:startTime, 
  //   endTime:endTime,
  //   petNumber:newPetNumber

  // }
  // console.log(propiedades)

  const [newPrice, setNewPrice] =useState(navigation.state.params.formData.salary);
  
  //Owner logueado actualmente que realizada la request
  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setNewOwner(child.val());
        });
      });
    
  }, [reloadData]);


  //Búsqueda por id del worker que creó el alojamiento
  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("id")
      .equalTo(navigation.state.params.formData.worker)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setNewWorker(child.val());
        });
      });
    ;
  }, [reloadData]);
    
    
  
  //Funcion llamada en el botón
   
    const all = () => {
      addRequestAccommodation();
      Alert.alert("Éxito", "Se ha creado su solicitud correctamente.");
      navigation.navigate("Home");
    };

  

    //Añadir la request a la db

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
      petNumber: newPetNumber,
      accommodation: newIdAccommodation,
      isPayed: newIsPayed
    };
    console.log(requestData);
    
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
    
        <Precio
              startTime={startTime}
              endTime= {endTime}
              petNumber= {newPetNumber}
              newPrice= {newPrice}
              setNewPrice={setNewPrice}
            />
      

      <View style={styles.buttonContainer}>
        <Button title="Crear Solicitud" onPress={all} color="#0de" />
      </View>

      </ScrollView>
  );
}



export default withNavigation(createRequestAccommodation);

function Precio (props) {
  const {startTime, endTime, petNumber, newPrice, setNewPrice} = props;

  let duration = ((endTime.getTime() - startTime.getTime())/(1000*60*60*24));   
  const days= parseInt(duration, 10 )+1;
  
  // Si cambia de mes coge los dias bien, pero si esta en el mismo mes coge 1 dia menos
  // estaria bien darle una vuelta a esto. Mientras se queda que suma un dia a todo.

  // const [DefDays, setDefDays] = useState(days);
  //  console.log(DefDays);

  useEffect(() => {

    // if(startTime.getMonth() != endTime.getMonth()){
    //   setDefDays(DefDays);
    //   console.log("Entra if");
    // }else{
    //   setDefDays(DefDays + 1);
    //   console.log("Entra else");

    // }
    console.log(days);
    let precio = newPrice * days ;
    let withPets = precio * petNumber;
    setNewPrice(withPets);
    console.log(withPets);
  }, []);
  

  return (
    <View><Text style={styles.text}>
    {"Precio Total Alojamiento\n"}
    <Text style={styles.data}>{newPrice}</Text>
    </Text>
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
