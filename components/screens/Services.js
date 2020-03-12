import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function Services(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchWalks")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../images/search-walks.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>

          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Buscar Paseos"
            onPress={() => navigation.navigate("SearchWalks")}
          />
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchAccommodations")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../images/search-accommodations.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Buscar alojamientos"
            onPress={() => navigation.navigate("SearchAccommodations")}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateWalk")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../images/create-walk.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Crear un paseo"
            onPress={() => navigation.navigate("CreateWalk")}
          />
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccommodation")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../images/create-accommodation.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
            title="Crear alojamientos"
            onPress={() => navigation.navigate("CreateAccommodation")}
          />
        </View>
      </View>
    </View>
  );
}

export default withNavigation(Services);

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#4cd0e1",
    width: 150,
    height: 55,
    borderRadius: 30,
    margin: 5,
    marginBottom: 5
  },
  btnContainer: {
    backgroundColor: "#4cd0e1"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  ImageIconStyle: {
    padding: 20,
    margin: 15,
    height: 100,
    width: 120,
    resizeMode: "stretch"
  }
});
