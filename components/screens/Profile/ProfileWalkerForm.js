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
  const [ availabilitiesLunes, setAvailabilitiesLunes ] = useState([]);
  const [ availabilitiesMartes, setAvailabilitiesMartes ] = useState([]);
  const [ availabilitiesMiercoles, setAvailabilitiesMiercoles ] = useState([]);
  const [ availabilitiesJueves, setAvailabilitiesJueves ] = useState([]);
  const [ availabilitiesViernes, setAvailabilitiesViernes ] = useState([]);
  const [ availabilitiesSabado, setAvailabilitiesSabado ] = useState([]);
  const [ availabilitiesDomingo, setAvailabilitiesDomingo ] = useState([]);
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
        const availabilitiesListLunes = [];
        const availabilitiesListMartes = [];
        const availabilitiesListMiercoles = [];
        const availabilitiesListJueves = [];
        const availabilitiesListViernes = [];
        const availabilitiesListSabado = [];
        const availabilitiesListDomingo = [];

        snap.forEach(child=>{

          switch(child.val().day){
            case "Lunes":
              availabilitiesListLunes.push(child.val());
              break;
            case "Martes":
              availabilitiesListMartes.push(child.val());
              break;
            case "Miercoles":
              availabilitiesListMiercoles.push(child.val());
              break;
            case "Jueves":
              availabilitiesListJueves.push(child.val());
              break;
            case "Viernes":
              availabilitiesListViernes.push(child.val());
              break;
            case "Sabado":
              availabilitiesListSabado.push(child.val());
              break;
            case "Domingo":
              availabilitiesListDomingo.push(child.val());
              break;
          }
           
        });
        setAvailabilitiesLunes(availabilitiesListLunes);
        setAvailabilitiesMartes(availabilitiesListMartes);
        setAvailabilitiesMiercoles(availabilitiesListMiercoles);
        setAvailabilitiesJueves(availabilitiesListJueves);
        setAvailabilitiesViernes(availabilitiesListViernes);
        setAvailabilitiesSabado(availabilitiesListSabado);
        setAvailabilitiesDomingo(availabilitiesListDomingo);
      });
    setReloadData(false);
  }, [reloadData]);

    

  return (
    <SafeAreaView>
      <ScrollView>
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
            <FlatList
              data={availabilitiesLunes}
              renderItem={availability => (
                <AvailabilityCheckBox availability={availability.item} navigation={navigation} />
              )}
              keyExtractor={availability => {
                availability.item;
              }}
            />
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Martes</Text>
        </CollapseHeader>
        <CollapseBody>
            <FlatList
              data={availabilitiesMartes}
              renderItem={availability => (
                <AvailabilityCheckBox availability={availability.item} navigation={navigation} />
              )}
              keyExtractor={availability => {
                availability.item;
              }}
            />
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Miércoles</Text>
        </CollapseHeader>
        <CollapseBody>
          <FlatList
            data={availabilitiesMiercoles}
            renderItem={availability => (
              <AvailabilityCheckBox availability={availability.item} navigation={navigation} />
            )}
            keyExtractor={availability => {
              availability.item;
            }}
          />
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Jueves</Text>
        </CollapseHeader>
        <CollapseBody>
          <FlatList
            data={availabilitiesJueves}
            renderItem={availability => (
              <AvailabilityCheckBox availability={availability.item} navigation={navigation} />
            )}
            keyExtractor={availability => {
              availability.item;
            }}
          />
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Viernes</Text>
        </CollapseHeader>
        <CollapseBody>
          <FlatList
            data={availabilitiesViernes}
            renderItem={availability => (
              <AvailabilityCheckBox availability={availability.item} navigation={navigation} />
            )}
            keyExtractor={availability => {
              availability.item;
            }}
          />
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Sábado</Text>
        </CollapseHeader>
        <CollapseBody>
          <FlatList
            data={availabilitiesSabado}
            renderItem={availability => (
              <AvailabilityCheckBox availability={availability.item} navigation={navigation} />
            )}
            keyExtractor={availability => {
              availability.item;
            }}
          />
        </CollapseBody>
      </Collapse>

      <Collapse>
        <CollapseHeader>
          <Text>Domingo</Text>
        </CollapseHeader>
        <CollapseBody>
          <FlatList
            data={availabilitiesDomingo}
            renderItem={availability => (
              <AvailabilityCheckBox availability={availability.item} navigation={navigation} />
            )}
            keyExtractor={availability => {
              availability.item;
            }}
          />
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
  </ScrollView>
  </SafeAreaView>
  );
}

function AvailabilityCheckBox(props) {
  
  const { availability } = props;
  const [checked, setIsChecked] = useState(false);
  /* console.log("==================================");
  console.log(availability);
  console.log("=================================="); */

  const setChecked = () => {
    setIsChecked(!checked);
  };
  
  return (
    <View style={styles.checkbox}>
      <CheckBox title={availability.day + ":  " + availability.startTime + " - " + availability.endDate } checked={checked} onPress={setChecked} />
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