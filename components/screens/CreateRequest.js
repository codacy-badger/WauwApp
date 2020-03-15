import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image} from 'react-native';


export default function createRequest( {navigation} ){
  const [person, setPerson] = useState(
    {name: 'Helena', age: '30', date: '21/01/2020', pet: '1',
    place:'Reina Mercedes, 20', message:'Hola Helena, me interesa tu servicio. Un saludo'}
  );
   
 

    const clickHandler = () => {
        navigation.navigate('notificationRequest');

  }

    return(
       <View >
        <Image source={require('../assets/direc.jpg')} style={{width: '100%', height: 150}}/>
        <Text>{'\n'}</Text>
    <Text style ={styles.text}>{'Event Date\n'}<Text style ={styles.data}>{person.date}</Text></Text>
         <Text style ={styles.text}>{'Event Place\n'}<Text style ={styles.data}>{person.place}</Text> </Text>
         <Text style ={styles.text}>{'Dog number \n'} <Text style ={styles.data}>{person.pet}</Text> </Text>
         <Text style ={styles.text}>{'Message \n'}<Text style ={styles.data}>{person.message}</Text></Text>
        
       <View style={styles.buttonContainer}>
       
        <Button title= 'send request' onPress= {clickHandler} color='#0de' />
        
       </View>
       </View>


       
       ) 
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
     
      
  }
  });