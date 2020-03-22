import React, { useRef } from "react";
import { View } from "react-native";
import ListWalks from "./ListWalks";
import Testeo from "../request/Testeo";
import Toast from "react-native-easy-toast";
import { YellowBox } from 'react-native';
import _ from 'lodash';
import Chat from "../chat/Chat";

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

//<ListWalks toastRef={toastRef} />
//<Toast ref={toastRef} position="center" opacity={0.7} />

export default function Notifications() {
  //const toastRef = useRef();
  return (
    <Chat></Chat>
  );
}
