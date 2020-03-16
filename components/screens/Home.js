import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, ScrollView, TouchableOpacity} from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { white } from "color-name";

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

function Home(props) {
  const { navigation } = props;
  const {height, width} = Dimensions.get('window');

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView scrollEventThrottle={16}>
    <View style={{flex:1, backgroundColor:white, paddingTop:20, paddingHorizontal:20}}>
      <Text style = {{fontSize:24, fontWeight:'700'}}>
        ¿Conoces nuestros servicios?
      </Text>
      <Text style={{fontSize:18,  fontWeight:'100', marginTop:10, fontWeight:'300'}}>
        Wauw no es únicamente una aplicación, Wauw es la forma más sencilla de ayudar a las protectoras
        de animales de tu ciudad. ¡Con cada transacción dentro de la aplicación estarás donando a las protectoras
        y muchos pequeñajos te lo agradecerán! 
      </Text>

    <View style={{width:width-40, height:200, 
    marginTop:20}}>
     <Image style={{flex:1,height:null, width:null, resizeMode:'cover',
     borderRadius: 5, borderWidth: 1, borderColor: '#dddddd'}}
      source={require("../images/dog.jpg")} />

    </View>

    <View style={{width:width-40, height:200, 
    marginTop:20}}>
    <Text style = {{fontSize:24, fontWeight:'700'}}>
        Conoce a las protectoras con las que trabajamos
    </Text>
    <Text style={{fontSize:18,  fontWeight:'100', marginTop:10, fontWeight:'300'}}>
        ¿Quieres saber con qué protectoras colaboramos? Te dejamos aquí toda la información disponible. 
    </Text>

    <View style={{width:width-40, height:200, 
    marginTop:20}}>
    <Button
            buttonStyle={styles.btnStyle}
            containerStyle={styles.btnContainer}
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
  btnStyle: {
    backgroundColor: "#ff7549"
  },
  btnContainer: {
    backgroundColor: "#ff7549"
  }
});