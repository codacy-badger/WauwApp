import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Button, View, Image, SafeAreaView, Alert } from "react-native";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config.js";


function showRequest(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;

  var id = request.workerId;
  var tipo = "";
  var status = "";
  var worker = [];

  console.log("id", id),

    db.ref("wauwers")
      .orderByChild("id")
      .equalTo(id)
      .on("child_added", snap => {
        worker = snap.val();
      });

  console.log("worker", worker);

  const cancel = () => {

    var idRequest = request.id;
    var query = db.ref().child("request/" + idRequest);

    query.update({
      pending: false,
      isCanceled: true
    })

    alert("Se ha cancelado la solicitud correctamente");

    navigation.navigate("Home");
  }

  if (request.type == "SITTER") {
    tipo = "Alojamiento";
  } else {
    tipo = "Paseo";
  }

  if (request.pending && !request.isCanceled) {
    status = "Pendiente de aceptación";
  } else if (!request.pending && request.isCanceled) {
    status = "La solicitud ha sido denegada";
  } else {
    status = "La solicitud ha sido aceptada";
  }


  if (request.pending && request.type == "WALK") {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Día: {request.availability_wauwer.availability.day} </Text>
        <Text> Hora de inicio: {request.availability_wauwer.availability.startTime} </Text>
        <Text> Hora de fin: {request.availability_wauwer.availability.endDate} </Text>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Cancelar solicitud"
            onPress={cancel}
          />
        </View>
      </SafeAreaView>
    );

  } else if (!request.pending && request.isCanceled && request.type == "WALK") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Día: {request.availability_wauwer.availability.day} </Text>
        <Text> Hora de inicio: {request.availability_wauwer.availability.startTime} </Text>
        <Text> Hora de fin: {request.availability_wauwer.availability.endDate} </Text>
      </SafeAreaView>
    );
  } else if (!request.pending && !request.isCanceled && request.type == "WALK") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Día: {request.availability_wauwer.availability.day} </Text>
        <Text> Hora de inicio: {request.availability_wauwer.availability.startTime} </Text>
        <Text> Hora de fin: {request.availability_wauwer.availability.endDate} </Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Abrir Chat"
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>
      </SafeAreaView>
    );
  } else if (request.pending && request.type == "SITTER") {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Fecha de inicio: {request.startTime} </Text>
        <Text> Fecha de fin: {request.endTime} </Text>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Cancelar solicitud"
            onPress={cancel}
          />
        </View>
      </SafeAreaView>
    );

  } else if (!request.pending && request.isCanceled && request.type == "SITTER") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Fecha de inicio: {request.startTime} </Text>
        <Text> Fecha de fin: {request.endTime} </Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Fecha de inicio: {request.startTime} </Text>
        <Text> Fecha de fin: {request.endTime} </Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Abrir Chat"
            onPress={() => navigation.navigate("Notifications")}
          />
        </View>
      </SafeAreaView>
    );

  }

  }

  export default withNavigation(showRequest);

  const styles = StyleSheet.create({

    btnStyle2: {
      backgroundColor: "#443099",
      borderRadius: 30,
      marginTop: 5,
      marginBottom: 5
    },
    btnContainer2: {
      alignItems: "center",
      alignSelf: "center",
      width: "75%",
      backgroundColor: "#443099",
      marginTop: 5,
      marginRight: 20,
      marginLeft: 20,
      marginBottom: 10
    }
  });
