import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function Services(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Search Walks"
          onPress={() => navigation.navigate("SearchWalks")}
        />
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Search Accommodations"
          onPress={() => navigation.navigate("SearchAccommodations")}
        />
      </View>
      <View style={styles.row}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Create Walk"
          onPress={() => navigation.navigate("CreateWalk")}
        />
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Create Accommodation"
          onPress={() => navigation.navigate("CreateAccommodation")}
        />
      </View>
    </View>
  );
}

export default withNavigation(Services);

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#4cd0e1",
    width: 150,
    height: 80
  },
  btnContainer: {
    backgroundColor: "#4cd0e1"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
