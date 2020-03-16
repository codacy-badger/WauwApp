import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image} from 'react-native';



export default function createRequest( props ){
    const { id, avgScore, description, dni, name, paypalURL, petNumber, photo, price, surname, wauwPoint, price, email } = props;
   
    const [newDate, setNewDate] = useState(null);
    const newPending = 'true';
    const [newInfo, setNewInfo] = useState(null);
    const newOwner = '';  
    const [newQuantity, setNewQuantity] = useState(null);
    const newType = 'walk';
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

    return(
        <View >
            <Text style ={styles.text}>{'Nombre Paseador\n'}<Text style ={styles.data}>{name}</Text></Text>
            <Text style ={styles.text}>{'Fecha\n'}<Text style ={styles.data}>{date}</Text> </Text>
            <Text style ={styles.text}>{'Información \n'} <Text style ={styles.data}>{info}</Text> </Text>
            <Text style ={styles.text}>{'Precio paseo \n'}<Text style ={styles.data}>{quantity}</Text></Text>
         
        <View style={styles.buttonContainer}>
        
            <Button title= 'Crear Solicitud' onPress= {addRequest} color='#0de' />
         
        </View>
        </View>
 
 
        
        );
 
}

const styles = StyleSheet.create({
    text: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderTopWidth:1,
      borderTopColor: '#ddd',

    },
    data: {
      paddingHorizontal: 8,
      paddingVertical: 9,
      color:'grey'      
    },
    buttonContainer:{
      marginTop:40,
     
      
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