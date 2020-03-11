import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function Search(props) {
  const { navigation } = props;

  return (
    <View>
      <Text> Página del buscador</Text>
      <View>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Search Walks"
          onPress={() => navigation.navigate("SearchWalks")}
        />
      </View>
      <View>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Search Accommodations"
          onPress={() => navigation.navigate("SearchAccommodations")}
        />
      </View>
    </View>
  );
}

export default withNavigation(Search);

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: "#00a680"
  },
  btnContainer: {
    backgroundColor: "#00a680"
  }
});
