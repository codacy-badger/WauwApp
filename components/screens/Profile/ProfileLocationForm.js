import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet} from "react-native";
import {Input, Button } from "react-native-elements";
import { email } from "../../account/QueriesProfile"
import {db} from "../../population/config";

export default function ProfileLocationForm(props) {
  const { navigation } = props;
  const[address, setAddress] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //const toastRef = useRef();
  console.log(email);
  console.log(address);
  console.log(userInfo);
  console.log(reloadData);


  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setUserInfo(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);

  const updateLocation = () => {
    setError(null);
    if (!address) {
      setError("La dirección no puede ser la misma.");
    } else {
      setIsLoading(true);
      let userData = {
        location: address
      };
      db.ref("wauwers")
        .child(id)
        .update(userData)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
        })
        .catch(() => {
          setError("Ha ocurrido un error");
          setIsLoading(false);
        });
    }
  }
  
  return (
        <View style={styles.view}>
          <Input
            placeholder="Avenida Reina Mercedes, Sevilla"
            containerStyle={styles.input}
            defaultValue={userInfo.location}
            onChange={v => setAddress(v.nativeEvent.text)}
            errorMessage={error}
          />
          <Button
            title="Cambiar dirección"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={updateLocation}
            loading={isLoading}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  input: {
    marginBottom: 10
  },
  btn: {
    backgroundColor: "#00a680"
  }
});