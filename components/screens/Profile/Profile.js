import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView
} from "react-native";
import firebase from "firebase";
import UserGuest from "../../account/UserGuest";
import { Button } from "react-native-elements";
import { YellowBox } from "react-native";
import _ from "lodash";
import { globalStyles } from "../../styles/global";
import { withNavigation } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function Profile(props) {
  const { navigation } = props;

  return (
    <SafeAreaView style={styles.area}>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.area}>
          <View style={styles.viewStyle}>
            <UserGuest />
          </View>
          <View style={styles.viewStyle2}>
            <Image
              source={require("../../../assets/images/prints.png")}
              style={styles.ImageIconStyle}
            />
            <Button
              buttonStyle={styles.btnStyle2}
              containerStyle={styles.btnContainer2}
              title="Cambiar mi Localización"
              onPress={() => navigation.navigate("ProfileLocationForm")}
            />
            <Button
              buttonStyle={styles.btnStyle2}
              containerStyle={styles.btnContainer2}
              title="Añadir un Perro"
              onPress={() => navigation.navigate("ProfileAddDogForm")}
            />
            <Button
              buttonStyle={styles.btnStyle2}
              containerStyle={styles.btnContainer2}
              title="Quiero ser Cuidador"
              onPress={() => navigation.navigate("ProfileSitterForm")}
            />
            <Button
              buttonStyle={styles.btnStyle2}
              containerStyle={styles.btnContainer2}
              title="Quiero ser Paseador"
              onPress={() => navigation.navigate("ProfileWalkerForm")}
            />
            <Image
              source={require("../../../assets/images/prints.png")}
              style={styles.ImageIconStyle}
            />

            <Button
              buttonStyle={styles.btnStyle}
              containerStyle={styles.btnContainer}
              title="Cerrar sesión"
              onPress={() => firebase.auth().signOut()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(Profile);

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#ff7549",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5,
    width: "100%"
  },
  btnContainer: {
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
    backgroundColor: "#ff7549",
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 50
  },
  btnStyle2: {
    backgroundColor: "#443099",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5,
    width: "100%"
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
  },
  btnTxtStyle: { color: "black" },
  viewStyle: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  viewStyle2: {
    paddingTop: 5,
    flex: 1,
    paddingBottom: 60,
    marginBottom: 60
  },
  ImageIconStyle: {
    height: "20%",
    width: "90%",
    resizeMode: "stretch",
    backgroundColor: "transparent",
    alignSelf: "center",
    marginBottom: 5
  },
  imageView: {
    backgroundColor: "transparent"
  },
  area: {
    flex: 1
  }
});
