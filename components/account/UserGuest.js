import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import InfoUser from "./InfoUser";
import { users } from "./QueriesProfile";
import AccountOptions from "./AccountOptions";

export default function UserGuest() {
  const [userInfo, setUserInfo] = useState(users[0]);
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user.providerData[0]);
    })();
    setReloadData(false);
  }, [reloadData]);

  return (
    <View style={styles.viewUserInfo}>
      <InfoUser userInfo={userInfo} setReloadData={setReloadData} />
      <AccountOptions userInfo={userInfo} setReloadData={setReloadData} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2"
  }
});
