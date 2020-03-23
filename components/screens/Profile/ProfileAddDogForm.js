import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile"

function createDog(props) {
  const { id, name,breed, description, owner, setIsVisibleModal, navigation } = props;
  const [newName, setNewName] = useState(null);
  const [newBreed, setNewBreed] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  const [newOwner, setnewOwner] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("value", function(snap){
      snap.forEach(function(child) {
        setnewOwner(child.val());
      });
    });
    setReloadData(false);
  }, [reloadData]);

  const addPet = () => {
    let id = db.ref("pet").push().key;
    let petData = {
      id: id,
      name: newName,
      breed: newBreed,
      description: newDescription,
      owner: newOwner,
    };
  
    if ((newName === null || newName === "") || (newBreed === null || newBreed === "") || (newDescription===null || newDescription==="")) {
      let errores = '';
      if (newName === null || newName === ""){
        errores = errores.concat("Debe escribir un nombre.\n");
      }
      if (newBreed === null || newBreed === ""){
        errores = errores.concat("Debe escribir una raza.\n");
      }
      if (newDescription===null || newDescription===""){
        errores = errores.concat("Debe dar una breve descripción de su perro.\n");
      }
      Alert.alert("Advertencia", errores.toString());
    } else {
      setIsLoading(true);
      db.ref("pet/" + id)
      .set(petData)
      .then(() => {
        setIsLoading(false);
        setReloadData(true);
        setIsVisibleModal(false);
      }).catch(() => {
        setError("Ha ocurrido un error");
        setIsLoading(false);
      });
      Alert.alert("Éxito", "Se ha registrado el perro correctamente.");
      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.view}>
      <Text>Formulario de datos de nuevo perro</Text>
      <View>
        <Text>¿Cómo se llama su perro?</Text>
        <TextInput
        placeholder="Ej.: Fluffy"
        containerStyle={styles.input}
        onChange={v => setNewName(v.nativeEvent.text)}    
        />  
        <Text>¿De qué raza es?</Text>
        <TextInput 
        placeholder="Ej.: Chiguagua"
        containerStyle={styles.input}
        onChange={v => setNewBreed(v.nativeEvent.text)}
        />
        <Text>Describa a su perro</Text>
        <TextInput 
        multiline={true}
        numberOfLines={5}
        containerStyle={styles.input}
        onChange={v => setNewDescription(v.nativeEvent.text)}
        />
        
        <Button
        title="Crear"
        onPress={addPet}
        loading={isLoading}
        />
      </View>
    </View>
  );
}

export default withNavigation(createDog);

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10,
  },
});