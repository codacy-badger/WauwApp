import React, { useRef } from "react";
import { View } from "react-native";
import ListRequest from "./ListRequests";
import Testeo from "../request/Testeo";
import Toast from "react-native-easy-toast";

export default function Chat() {
  const toastRef = useRef();
  return (
    <View>
      <ListRequest toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </View>
  );
}
