import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { db } from "../population/config.js";

export default function ChangeDescriptionForm(props) {
  const { id, desc, setIsVisibleModal, setReloadData } = props;
  const [newDesc, setNewDesc] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDescription = () => {
    setError(null);
    if (!newDesc) {
      setError("La descripción no puede ser la misma.");
    } else {
      setIsLoading(true);
      let userData = {
        description: newDesc
      };
      db.ref("wauwers")
        .child(id)
        .update(userData)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Ha ocurrido un error");
          setIsLoading(false);
        });
    }
  };
  return (
    <View>
      <View>
        <View style={styles.view}>
          <Input
            placeholder="Descripción"
            containerStyle={styles.input}
            defaultValue={desc && desc}
            onChange={v => setNewDesc(v.nativeEvent.text)}
            rightIcon={{
              type: "material-community",
              name: "lead-pencil",
              color: "#c2c2c2"
            }}
            errorMessage={error}
          />
          <Button
            title="Cambiar descripción"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={updateDescription}
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680",
    borderRadius: 18
  }
});
