import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import InfoUser from "./InfoUser";
import AccountOptions from "./AccountOptions";
import * as firebase from "firebase";
import { db } from "../population/config";
import { email } from "./QueriesProfile";

export default function UserGuest() {
  const [userInfo, setUserInfo] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  //const toastRef = useRef();
  //console.log(email);

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
