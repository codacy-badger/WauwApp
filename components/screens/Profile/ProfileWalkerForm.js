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
  Picker
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { YellowBox } from "react-native";
import { CheckBox } from "react-native-elements";
import _ from "lodash";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function ProfileWalkerForm(props) {
  const { navigation } = props;
  const [reloadData, setReloadData] = useState(false);
  const [newWalker, setNewWalker] = useState([]);
  const [availabilitiesLunes, setAvailabilitiesLunes] = useState([]);
  const [availabilitiesMartes, setAvailabilitiesMartes] = useState([]);
  const [availabilitiesMiercoles, setAvailabilitiesMiercoles] = useState([]);
  const [availabilitiesJueves, setAvailabilitiesJueves] = useState([]);
  const [availabilitiesViernes, setAvailabilitiesViernes] = useState([]);
  const [availabilitiesSabado, setAvailabilitiesSabado] = useState([]);
  const [availabilitiesDomingo, setAvailabilitiesDomingo] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);

  const [isChecked, setIsChecked] = useState();

  const [availabilitiesGlobal, setAvailabilitiesGlobal] = useState([]);

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

  useEffect(() => {
    // To retrieve availabilities

    db.ref("availability").on("value", snap => {
      const avGlobal = [];
      const availabilitiesListLunes = [];
      const availabilitiesListMartes = [];
      const availabilitiesListMiercoles = [];
      const availabilitiesListJueves = [];
      const availabilitiesListViernes = [];
      const availabilitiesListSabado = [];
      const availabilitiesListDomingo = [];
      var i = 0;
      snap.forEach(child => {
        switch (child.val().day) {
          case "Lunes":
            if (i == 16) {
              i = 0;
            }
            const avLunes = [];
            avLunes.push(child.val());
            avLunes.push(false);
            avLunes.push(i);
            i++;
            availabilitiesListLunes.push(avLunes);
            break;
          case "Martes":
            if (i == 16) {
              i = 0;
            }
            const avMartes = [];
            avMartes.push(child.val());
            avMartes.push(false);
            avMartes.push(i);
            i++;
            availabilitiesListMartes.push(avMartes);
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
          default:
            break;
        }
      }
      );
      avGlobal.push(availabilitiesListLunes);
      avGlobal.push(availabilitiesListMartes);
      avGlobal.push(availabilitiesListMiercoles);
      avGlobal.push(availabilitiesListJueves);
      avGlobal.push(availabilitiesListViernes);
      avGlobal.push(availabilitiesListSabado);
      avGlobal.push(availabilitiesListDomingo);
     
      setAvailabilitiesGlobal(avGlobal);
      
    });
    setReloadData(false);
  }, [reloadData]);

  /* console.log("=====================");
  console.log("Availabilities" + availabilitiesGlobal);
  console.log("============ FIN ================"); */
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <Text style={styles.text}> Salario </Text>
            <Text style={styles.data}>{newWalker.walkSalary}</Text>
          </View>
          <Text style={styles.text}> Disponibilidad </Text>
          <View>
            <Collapse>
              <CollapseHeader>
                <Text>Lunes</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[0]}
                  isChecked={isChecked}
                  globalPos={0}
                />
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Martes</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[1]}
                  isChecked={isChecked}
                  globalPos={1}
                />
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Miércoles</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[2]}
                  isChecked={isChecked}
                  globalPos={2}
                />
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Jueves</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[3]}
                  isChecked={isChecked}
                  globalPos={3}
                />
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Viernes</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[4]}
                  isChecked={isChecked}
                  globalPos={4}
                />
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Sábado</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[5]}
                  isChecked={isChecked}
                  globalPos={5}
                />
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Domingo</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesGlobal[6]}
                  isChecked={isChecked}
                  globalPos={6}
                />
              </CollapseBody>
            </Collapse>
          </View>
          <View>
            <Text style={styles.text}>
              {" "}
              ¿Cuál es el número máximo de perros que te gustaría pasear?{" "}
            </Text>
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

function AvailabilityFlatList(props) {
  const { availabilities, globalPos } = props;
  //console.log("availabilities: ",availabilities);

  return (
    <FlatList
      data={availabilities}
      renderItem={availability => (
        <AvailabilityCheckBox
          availability={availability.item}
          globalPos={globalPos}
        />
      )}
      keyExtractor={availability => {
        availability.item;
      }}
    />
  );
}

function AvailabilityCheckBox(props) {
  const { availability, globalPos } = props;
  const [checked, setIsChecked] = useState(false);
  /* console.log("==================================");
  console.log(availability);
  console.log("=================================="); */
  //console.log(availability);

  const setChecked = () => {
    
    setIsChecked(!checked);
    console.log(availability[2]);
  };

  return (
    <View style={styles.checkbox}>
      <CheckBox
        title={
          availability[0].day +
          ":  " +
          availability[0].startTime +
          " - " +
          availability[0].endDate
        }
        checked={availability[1]}
        onPress={setChecked}
      />
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
