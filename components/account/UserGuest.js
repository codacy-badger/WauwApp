import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import InfoUser from "./InfoUser";
import AccountOptions from "./AccountOptions";
import * as firebase from "firebase";
import { db } from '../population/config'

export default function UserGuest() {
  const [userInfo, setUserInfo] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  //const toastRef = useRef();

  useEffect(() => {
    let email = '';

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        email = user.email;
      }
    });

    db.ref("wauwers").orderByChild("id").startAt(email).on("value", function(snap){
      const users = [];
      snap.forEach(function(child){
          users.push(child.val());
      });

      setUserInfo(users[0]);
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
