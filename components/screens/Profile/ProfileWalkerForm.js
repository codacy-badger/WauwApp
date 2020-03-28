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
      });
      setAvailabilitiesGlobal(availabilitiesListLunes);
      setAvailabilitiesMartes(availabilitiesListMartes);
      setAvailabilitiesMiercoles(availabilitiesListMiercoles);
      setAvailabilitiesJueves(availabilitiesListJueves);
      setAvailabilitiesViernes(availabilitiesListViernes);
      setAvailabilitiesSabado(availabilitiesListSabado);
      setAvailabilitiesDomingo(availabilitiesListDomingo);

      // avGlobal.push(availabilitiesListMartes);
      // avGlobal.push(availabilitiesListMiercoles);
      // avGlobal.push(availabilitiesListJueves);
      // avGlobal.push(availabilitiesListViernes);
      // avGlobal.push(availabilitiesListSabado);
      // avGlobal.push(availabilitiesListDomingo);

      avGlobal.push(availabilitiesLunes);
      
      
      avGlobal.push(availabilitiesListMartes);
      setAvailabilitiesGlobal(avGlobal);
      console.log("NuevoGLOBAL: ", availabilitiesGlobal);
      //console.log(availabilitiesListLunes);
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
          <Text style={styles.text}> Disponibilidad </Text>
          <View>
            <Collapse>
              <CollapseHeader>
                <Text>Lunes</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesLunes}
                  isChecked={isChecked}
                  globalPos={0}
                />
                {/* <FlatList
                  data={availabilitiesLunes}
                  renderItem={availability => (
                    <AvailabilityCheckBox
                      availability={availability.item}
                      navigation={navigation}
                      isCkecked={isChecked}
                    />
                  )}
                  keyExtractor={availability => {
                    availability.item;
                  }}
                /> */}
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Martes</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesMartes}
                  isChecked={isChecked}
                />
                {/* <FlatList
                  data={availabilitiesMartes}
                  renderItem={availability => (
                    <AvailabilityCheckBox
                      availability={availability.item}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={availability => {
                    availability.item;
                  }}
                /> */}
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Miércoles</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesMiercoles}
                  isChecked={isChecked}
                />
                {/* <FlatList
                  data={availabilitiesMiercoles}
                  renderItem={availability => (
                    <AvailabilityCheckBox
                      availability={availability.item}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={availability => {
                    availability.item;
                  }}
                /> */}
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Jueves</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesJueves}
                  isChecked={isChecked}
                />
                {/* <FlatList
                  data={availabilitiesJueves}
                  renderItem={availability => (
                    <AvailabilityCheckBox
                      availability={availability.item}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={availability => {
                    availability.item;
                  }}
                /> */}
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Viernes</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesViernes}
                  isChecked={isChecked}
                />
                {/* <FlatList
                  data={availabilitiesViernes}
                  renderItem={availability => (
                    <AvailabilityCheckBox
                      availability={availability.item}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={availability => {
                    availability.item;
                  }}
                /> */}
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Sábado</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesSabado}
                  isChecked={isChecked}
                />
                {/* <FlatList
                  data={availabilitiesSabado}
                  renderItem={availability => (
                    <AvailabilityCheckBox
                      availability={availability.item}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={availability => {
                    availability.item;
                  }}
                /> */}
              </CollapseBody>
            </Collapse>

            <Collapse>
              <CollapseHeader>
                <Text>Domingo</Text>
              </CollapseHeader>
              <CollapseBody>
                <AvailabilityFlatList
                  availabilities={availabilitiesDomingo}
                  isChecked={isChecked}
                />
                {/* <FlatList
                  data={availabilitiesDomingo}
                  renderItem={availability => (
                    <AvailabilityCheckBox
                      availability={availability.item}
                      navigation={navigation}
                    />
                  )}
                  keyExtractor={availability => {
                    availability.item;
                  }}
                /> */}
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
  const { availability } = props;
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
