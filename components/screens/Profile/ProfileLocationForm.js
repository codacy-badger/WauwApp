import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet} from "react-native";
import {Input, Button } from "react-native-elements";
import { email } from "../../account/QueriesProfile"
import {db} from "../../population/config";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function ProfileLocationForm(props) {
  const { navigation } = props;
  const[address, setAddress] = useState(null);
  const[coordenadas,setCoordenadas] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wauwer,setWauwer] = useState([]);
  

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setWauwer(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);


  async function getLocationAsync() {
      let currentAddress = await Location.geocodeAsync(address);
      console.log(currentAddress);
      
      return currentAddress.coords;
 }

 async function reverseLocation(coordenadas) {
   let direccion = await Location.reverseGeocodeAsync(coordenadas);
   console.log(direccion);

   return direccion.street;

 }

  const updateLocation = () => {
    setError(null);
    if (!address) {
      setError("La dirección no puede ser la misma.");
    } else {
      setIsLoading(true);
      let userData = {
        location: address
      }
      db.ref("wauwers/" + wauwer.id)
        .update(userData)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
        })
        .catch(() => {
          setError("Ha ocurrido un error");
          setIsLoading(false);
        });
    }
  }

  const ubicacionActual = () => { 
    setIsLoading(true);
    setCoordenadas(getLocationAsync());
    setAddress(reverseLocation(coordenadas));
    let userData = {
      address: address,
      coordenadas: coordenadas
    }
    db.ref("wauwers/" + wauwer.id)
        .update(userData)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
        })
        .catch(() => {
          setError("Ha ocurrido un error");
          setIsLoading(false);
        });
    }



  
  return (
        <View style={styles.view}>
          <Input
            placeholder="Avenida Reina Mercedes, Sevilla"
            containerStyle={styles.input}
            defaultValue={wauwer.address}
            onChange={v => setAddress(v.nativeEvent.text)}
            errorMessage={error}
          />
          <Button
            title="Cambiar dirección"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={ubicacionActual}
            loading={isLoading}
          />
        </View>
  );
  }


const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  input: {
    marginBottom: 10
  },
  btn: {
    backgroundColor: "#00a680"
  }
});