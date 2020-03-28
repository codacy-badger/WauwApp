import React, { useState, useEffect } from "react";
import { 
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  Input,
  Button,
  View,
  Alert,
  Picker } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { YellowBox } from 'react-native';
import { CheckBox } from "react-native-elements";
import _ from 'lodash';
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


function ProfileWalkerForm(props) {
  const { navigation } = props;
  const [ reloadData, setReloadData ] = useState(false);
  const [ newWalker, setNewWalker ] = useState([]);
  const [ availabilities, setAvailabilities ] = useState([]);

  useEffect(() => {
    // To retrieve the current logged user
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setNewWalker(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);

  useEffect(()=>{
    // To retrieve availabilities
    db.ref("availability")
      .on("value", snap => {
        const availabilitiesList = [];
        snap.forEach(child=>{
          availabilitiesList.push(child.val());
        });
        setAvailabilities(availabilitiesList);
      });
    setReloadData(false);
  }, [reloadData]);

    console.log(newWalker);

  return (
    <View>
      <View>
        <Text style={styles.text}> Salario </Text>
        <Text style={styles.data}>{newWalker.walkSalary}</Text>
      </View>
      <Text style={styles.text}> Disponibilidad  </Text>
      <View>
      <Collapse>
        <CollapseHeader>
          <Text>Lunes</Text>
        </CollapseHeader>
        <CollapseBody>
          <Text>Aaron Bennet</Text>
          <Text>Claire Barclay</Text>
          <Text>Kelso Brittany</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Martes</Text>
        </CollapseHeader>
        <CollapseBody>
          <Text>Aaron Bennet</Text>
            <Text>Claire Barclay</Text>
            <Text>Kelso Brittany</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Miércoles</Text>
        </CollapseHeader>
        <CollapseBody>
          <Text>Aaron Bennet</Text>
          <Text>Claire Barclay</Text>
          <Text>Kelso Brittany</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Jueves</Text>
        </CollapseHeader>
        <CollapseBody>
          <Text>Aaron Bennet</Text>
          <Text>Claire Barclay</Text>
          <Text>Kelso Brittany</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Viernes</Text>
        </CollapseHeader>
        <CollapseBody>
          <Text>Aaron Bennet</Text>
          <Text>Claire Barclay</Text>
          <Text>Kelso Brittany</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Sábado</Text>
        </CollapseHeader>
        <CollapseBody>
          <Text>Aaron Bennet</Text>
          <Text>Claire Barclay</Text>
          <Text>Kelso Brittany</Text>
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Domingo</Text>
        </CollapseHeader>
        <CollapseBody>
          <Text>Aaron Bennet</Text>
          <Text>Claire Barclay</Text>
          <Text>Kelso Brittany</Text>
        </CollapseBody>
      </Collapse>

    </View>
    <View>
        <Text style={styles.text}> ¿Cuál es el número máximo de perros que te gustaría pasear? </Text>
        <Text style={styles.data}>{newWalker.petNumberWalker}</Text>
    </View>
      <Text style={styles.text}> Ubicación </Text>
      
    <View style={styles.buttonContainer}>
      <Button title="Voy a ser Pasedor" onPress={null} color="#0de" />
    </View>
  </View>
  );
}

export default withNavigation(ProfileWalkerForm);

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