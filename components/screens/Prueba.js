import React from "react";
import { View, Text } from "react-native";

export default function Prueba(props) {
  const { req } = props;

  return (
    <View>
      <Text>Esto es una prueba. {req}</Text>
    </View>
  );
}
