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

export default function Prueba(props) {
  const { req } = props;

  return (
    <View>
      <Text>Esto es una prueba. {req}</Text>
    </View>
  );
}
