import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Input, Button } from "react-native";
import { email } from "../../account/QueriesProfile"

export default function ProfileLocationForm(props) {
  const { navigation } = props;
  const[address, setAddress] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //const toastRef = useRef();
  //console.log(email);
  console.log(address);


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
    <View>
      <View>
        <View style={styles.view}>
          <Input
            placeholder="Avenida Reina Mercedes, Sevilla"
            containerStyle={styles.input}
            defaultValue={address && address}
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
      </View>
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
});