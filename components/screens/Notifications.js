import React, { useRef } from "react";
import { View } from "react-native";
import ListWalks from "./ListWalks";
import Testeo from "../request/Testeo";
import Toast from "react-native-easy-toast";
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function Chat() {
  const toastRef = useRef();
  return (
    <View>
      <ListWalks toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </View>
  );
}

