import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import _ from 'lodash';
import { email } from '../account/QueriesProfile';
import { db } from "../population/config.js";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "../Loading";

export default function Chats() {
  //const { navigation } = props; navigation={navigation}
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [data, setData] = useState([]);

  let currentUser;
  let otherUserID;
  let otherUserPhoto;
  let otherUserName;

  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      currentUser = snap.val();
    });

  console.log(currentUser);

  useEffect(() => {

    db.ref("requests").on("value", snap => {
      const allData = [];
      snap.forEach(child => {
        const requestsData = [];
        
        if ((child.val().idWalker == currentUser.id || child.val().idWauwer == currentUser.id) &&
          (child.val().isCanceled === false && child.val().pending === false)) {

          if (child.val().idWalker != currentUser.id) {
            otherUserID = child.val().idWalker;
          } else {
            otherUserID = child.val().idWauwer;
          }

          db.ref("wauwers").orderByChild("id").equalTo(otherUserID).on("child_added", snap => {
            otherUserName = snap.val().name;
          });

          db.ref("wauwers").orderByChild("id").equalTo(otherUserID).on("child_added", snap => {
            otherUserPhoto = snap.val().photo;
          });

          requestsData.push(otherUserName);
          requestsData.push(child.val().type);
          requestsData.push(otherUserPhoto);
          allData.push(requestsData);
        }
      });
      setData(allData);
    });

    setReloadData(false);
    setLoading(false);
  }, [reloadData]);//esto es el disparador del useEffect
  return (

    <SafeAreaView>
      <ScrollView>
        <Loading isVisible={loading} text={"Un momento..."} />
        {data ? (
          <FlatList
            data={data}
            renderItem={requestsData => (
              <RequestChat requestsData={requestsData} />
            )}
            keyExtractor={requestsData => {
              requestsData
            }}
          />
        ) : (
            <View>
              <Text> No hay chats abiertos </Text>
            </View>
          )}
      </ScrollView>
    </SafeAreaView>
  );
}

function RequestChat(props) {
  const { requestsData } = props;
  console.log("NOMBRE");
  console.log(requestsData.item[0]);
  console.log("TIPO");
  console.log(requestsData.item[1]);
  console.log("FOTO");
  console.log(requestsData.item[2]);
  console.log('==========================');

  return (
    <View>
      <View>
        <Text>{requestsData.item[0]}</Text>
      </View>
      <View>
        <Text> {requestsData.item[1]} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  }
});


/* const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <Chat user={{
      name: userInfo.name,
      _id: userInfo.id,
      avatar: userInfo.photo
    }}></Chat>
  ); */

