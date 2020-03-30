import React, { useState, useEffect } from "react";
import { Text, View, Alert, SafeAreaView, ScrollView } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import _ from "lodash";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";

function createRequestAccommodation(props) {
  const { navigation } = props;

  const [reloadData, setReloadData] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Atributos del props
  const newIdAccommodation = navigation.state.params.formData.idAccommodation;
  const startTime = navigation.state.params.formData.startTime;
  const endTime = navigation.state.params.formData.endTime;
  const newPetNumber = navigation.state.params.formData.petNumber;

  //Poner fechas medianamente bonitas
  const newStartTime = startTime.toLocaleString("en-US").substring(0, 10);
  const newEndTime = endTime.toLocaleString("en-US").substring(0, 10);

  //Atributos definidos

  const newIsCanceled = false;
  const newType = "sitter";
  const newIsPayed = false;

  const newPending = true;

  //Worker y owner

  const [newWorker, setNewWorker] = useState([]);
  const [newOwner, setNewOwner] = useState([]);

  const [newPrice, setNewPrice] = useState(
    navigation.state.params.formData.salary
  );

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
  }, [reloadData]);

  //Funcion llamada en el botón

  const all = () => {
    addRequestAccommodation();
    Alert.alert("Éxito", "Se ha creado su solicitud correctamente.");
    navigation.navigate("Home");
  };

  //Añadir la request a la db

  const addRequestAccommodation = () => {
    let id = db.ref("requests").push().key;
    setError(null);
    setIsLoading(true);
    let requestData = {
      id: id,
      pending: newPending,
      owner: newOwner.id,
      price: newPrice,
      type: newType,
      isCanceled: newIsCanceled,
      startTime: newStartTime,
      endTime: newEndTime,
      worker: newWorker.id,
      petNumber: newPetNumber,
      accommodation: newIdAccommodation,
      isPayed: newIsPayed
    };

    setIsLoading(true);

    db.ref("requests/" + id)
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
    <SafeAreaView style={globalStyles.safeShowRequestArea}>
      <View style={globalStyles.showRequestFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.showRequestRow}>
            <View style={globalStyles.editAccommodationColumn2}>
              <Text style={globalStyles.accommodationSitter}>
                {"Nombre del Cuidador\n"}

                <Text style={globalStyles.accommodationSitter2}>
                  {newWorker.name}
                </Text>
              </Text>
              <Text style={globalStyles.accommodationSitter3}>
                {newWorker.description}
              </Text>

              <Text style={globalStyles.accommodationSitter}>
                {"Fecha de inicio\n"}
                <Text style={globalStyles.accommodationSitter2}>
                  {newStartTime}
                </Text>{" "}
              </Text>
              <Text style={globalStyles.accommodationSitter}>
                {"Fecha de finalización\n"}
                <Text style={globalStyles.accommodationSitter2}>
                  {newEndTime}
                </Text>{" "}
              </Text>

              <Precio
                startTime={startTime}
                endTime={endTime}
                petNumber={newPetNumber}
                newPrice={newPrice}
                setNewPrice={setNewPrice}
              />

              <Button
                buttonStyle={globalStyles.accommodationBtn}
                containerStyle={globalStyles.accommodationBtnCnt}
                title="Enviar Solicitud"
                onPress={all}
                icon={
                  <Icon
                    type="material-community"
                    name="send"
                    size={20}
                    color="white"
                    marginLeft={10}
                  />
                }
                titleStyle={globalStyles.editAccommodationEditDateTittle}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withNavigation(createRequestAccommodation);

function Precio(props) {
  const { startTime, endTime, petNumber, newPrice, setNewPrice } = props;

  let duration =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24);
  const days = parseInt(duration, 10) + 1;

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
    let precio = newPrice * days;
    let withPets = precio * petNumber;
    setNewPrice(withPets);
    console.log(withPets);
  }, []);

  return (
    <View>
      <Text style={globalStyles.accommodationSitter}>
        {"Precio Total del Alojamiento\n"}
        <Text style={globalStyles.accommodationSitter2}>{newPrice} €</Text>
      </Text>
    </View>
  );
}
