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
      getPermisos();
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true });
      console.log('Flag Location:');
      console.log(location);
      console.log('Flag LocationCoords:');
      console.log(location.coords);

      let currentAddress = await Location.geocodeAsync('Avenida Reina Mercedes 45, Sevilla');
      console.log('Flag CurrentAddress:');
      console.log(currentAddress);

      let geocode = await Location.reverseGeocodeAsync({latitude: 37.383127 , longitude: -6.0015874});
      console.log('Flag GeoCode:');
      console.log(geocode);

      let geocode2 = await Location.reverseGeocodeAsync(location.coords);
      console.log('Flag GeoCode2:');
      console.log(geocode2);
      
      //return currentAddress.coords;
 }

  async function getLocation2Async() {
    
    let currentAddress = await Location.geocodeAsync(address);
    console.log(currentAddress);
    
    return currentAddress.coords;
  }

  async function getPermisos() {
      // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
      const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        console.log('Permisos concedidos');
        //return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      } else {
        throw new Error('Location permission not granted');
      }
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

    const ubicacionActual2 = () => { 
      
      setIsLoading(true);
    
      getLocationAsync();

      // let userData = {
      //   address: address,
      //   coordenadas: coordenadas
      // }
      // db.ref("wauwers/" + wauwer.id)
      //     .update(userData)
      //     .then(() => {
      //       setIsLoading(false);
      //       setReloadData(true);
      //     })
      //     .catch(() => {
      //       setError("Ha ocurrido un error");
      //       setIsLoading(false);
      //     });
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
            onPress={ubicacionActual2}
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