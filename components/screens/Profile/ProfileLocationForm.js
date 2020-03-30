import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Alert} from "react-native";
import {Input, Button } from "react-native-elements";
import { email } from "../../account/QueriesProfile"
import {db} from "../../population/config";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapView from "react-native-maps";
import Modal from "../../account/Modal";
import { withNavigation } from "react-navigation";

 export default function ProfileLocationForm(props) {
  const { navigation } = props;
  //Dirección postal
  const [wauwerAddress, setWauwerAddress] = useState("");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationWauwer, setLocationWauwer] = useState(null);
  const [error, setError] = useState(null);
  const [wauwer, setWauwer] = useState();

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setWauwer(child.val());
        });
      });
    
  }, []);


  
  return (
    <View>
    <FormAdd
        setWauwerAddress={setWauwerAddress}
        setIsVisibleMap={setIsVisibleMap}
        locationWauwer={locationWauwer}
        wauwer={wauwer}
        wauwerAddress={wauwerAddress}
        navigation={navigation}
      />
    <Map
    isVisibleMap={isVisibleMap}
    setIsVisibleMap={setIsVisibleMap}
    setLocationWauwer={setLocationWauwer}
  />
  </View>
  );
  }

  function FormAdd(props) {
    const {
      setWauwerAddress,
      setIsVisibleMap,
      locationWauwer,
      wauwer,
      wauwerAddress,
      navigation
    } = props;

    const guardarLocation = () => {
      if(!locationWauwer || wauwerAddress == "") {
        Alert.alert("Por favor, escribe una dirección y marca una localización usando el icono del mapa");
      }else {
      let location = {
        location: locationWauwer
      }

      let add = {
        address: wauwerAddress
      }
      db.ref("wauwers/" + wauwer.id).update(location);
      db.ref("wauwers/" + wauwer.id).update(add);
      Alert.alert(
        "Editado",
        "Editado correctamente",
        [
          {text: "Vale", onPress: () => navigation.navigate("ProfileDrawer")},
        ],
        { cancelable: false }
      )
      } 
    }
  
    return (
      <View style={styles.viewForm}>
        <Input
          placeholder="Dirección"
          containerStyle={styles.input}
          rightIcon={{
            type: "material-community",
            name: "google-maps",
            color: locationWauwer ? "#00a680" : "#c2c2c2",
            onPress: () => setIsVisibleMap(true)
          }}
          onChange={e => setWauwerAddress(e.nativeEvent.text)}
        />

        <Button
          title="Guardar Ubicacion"
          onPress={guardarLocation}
          containerStyle={styles.viewMapBtnContainerSave}
          buttonStyle={styles.viewMapBtnSave}
            />
      </View>
    );
  }

  function Map(props) {
    const {
      isVisibleMap,
      setIsVisibleMap,
      setLocationWauwer,
    } = props;
    const [location, setLocation] = useState(null);
  
    useEffect(() => {
      (async () => {
        const resultPermissions = await Permissions.askAsync(
          Permissions.LOCATION
        );
        const statusPermissions = resultPermissions.permissions.location.status;
  
        if (statusPermissions !== "granted") {
          
          setError("No tienes activado el permiso de localización.")
        } else {
          const loc = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001
          });
        }
      })();
    }, []);
  
    const confirmLocation = () => {
      setLocationWauwer(location);
      Alert.alert("Localización marcada");
      setIsVisibleMap(false);
    };
  
    return (
      <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
        <View>
          {location && (
            <MapView
              style={styles.mapStyle}
              initialRegion={location}
              showsUserLocation={true}
              onRegionChange={region => setLocation(region)}
            >
              <MapView.Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude
                }}
                draggable
              />
            </MapView>
          )}
          <View style={styles.viewMapBtn}>
            <Button
              title="Guardar Ubicacion"
              onPress={confirmLocation}
              containerStyle={styles.viewMapBtnContainerSave}
              buttonStyle={styles.viewMapBtnSave}
            />
            <Button
              title="Cancelar Ubicación"
              onPress={() => setIsVisibleMap(false)}
              containerStyle={styles.viewMapBtnContainerCancel}
              buttonStyle={styles.viewMapBtnCancel}
            />
          </View>
        </View>
      </Modal>
    );
  }



const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  },
  mapStyle: {
    width: "100%",
    height: 550
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },
  viewMapBtnContainerSave: {
    paddingRight: 5
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680"
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d"
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginBottom: 10
  },
});