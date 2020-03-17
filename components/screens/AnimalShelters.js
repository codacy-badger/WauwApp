import React from "react";
import { View, Text } from "react-native";
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function AnimalShelters() {
  return (
    <View>
      <Text style = {{fontSize:24, fontWeight:'700', 
      paddingHorizontal:20}}>
          Página de información de protectoras
      </Text>

    </View>
  );
  }