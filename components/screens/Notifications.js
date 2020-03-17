import React, { useRef } from "react";
import { View } from "react-native";
import ListWalks from "./ListWalks";
import Testeo from "../request/Testeo";
import Toast from "react-native-easy-toast";

export default function Chat() {
  const toastRef = useRef();
  return (
    <View>
      <ListWalks toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </View>
  );
}
