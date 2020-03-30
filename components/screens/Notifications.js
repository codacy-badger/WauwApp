import React, { useRef } from "react";
import { View } from "react-native";
import ListMyNotifications from "./ListMyNotifications";
import Toast from "react-native-easy-toast";


export default function Chat() {
  const toastRef = useRef();
  return (
    <View>
      <ListMyNotifications toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </View>
  );
}

