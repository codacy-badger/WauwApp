import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { white } from "color-name";
import { globalStyles } from "../styles/global";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function Home(props) {
  const { navigation } = props;
  const { height, width } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.viewStyle}>
          <Text style={globalStyles.title}>¿Conoces nuestros servicios?</Text>
          <Text style={globalStyles.contentText}>
            Wauw no es únicamente una aplicación, Wauw es la forma más sencilla
            de ayudar a las protectoras de animales de tu ciudad. ¡Con cada
            transacción dentro de la aplicación estarás donando a las
            protectoras y muchos pequeñajos te lo agradecerán!
          </Text>

          <View style={styles.viewStyle2}>
            <Image
              style={styles.image}
              source={require("../../assets/images/dog.jpg")}
            />
          </View>

          <View style={styles.viewStyle2}>
            <Text style={globalStyles.title}>Conoce a las protectoras</Text>
            <Text style={globalStyles.contentText}>
              ¿Quieres saber con qué protectoras colaboramos? Te dejamos aquí
              toda la información disponible.
            </Text>

            <View style={styles.viewStyle2}>
              <Button
                buttonStyle={globalStyles.btnStyle}
                titleStyle={globalStyles.btnTextStyle}
                title="Protectoras"
                onPress={() => navigation.navigate("AnimalShelters")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(Home);

const styles = StyleSheet.create({
  viewStyle2: {
    width: "95%",
    height: 200,
    marginTop: 20,
    alignItems: "center"
  },
  viewStyle: {
    flex: 1,
    padding: 20
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#dddddd"
  }
});
