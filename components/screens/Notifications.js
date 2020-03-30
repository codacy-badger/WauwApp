import React, { useRef } from "react";
import { View, SafeAreaView } from "react-native";
import ListMyNotifications from "./ListMyNotifications";
import Toast from "react-native-easy-toast";
import { YellowBox } from "react-native";
import _ from "lodash";
import { globalStyles } from "../styles/global";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

export default function Notifications() {
  const toastRef = useRef();
  return (
    <SafeAreaView style={globalStyles.safeMyRequestsArea}>
      <ListMyNotifications toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </SafeAreaView>
  );
}
