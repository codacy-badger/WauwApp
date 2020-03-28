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
import { Avatar } from "react-native-elements";

export default function Chats(props) {
  const { navigation } = props;
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

  useEffect(() => {

    db.ref("requests").on("value", snap => {
      const allData = [];
      snap.forEach(child => {
        const requestsData = [];

        if ((child.val().worker == currentUser.id || child.val().owner == currentUser.id) &&
          (child.val().isCanceled === false && child.val().pending === false && child.val().isPayed === true)) {

          if (child.val().worker != currentUser.id) {
            otherUserID = child.val().worker;
          } else {
            otherUserID = child.val().owner;
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
          requestsData.push(child.val().id);
          allData.push(requestsData);
        }
      });
      setData(allData);
    });

    setReloadData(false);
    setLoading(false);
  }, [reloadData]);
  return (

    <SafeAreaView>
      <ScrollView>
        <Loading isVisible={loading} text={"Un momento..."} />
        {data ? (
          <FlatList
            data={data}
            renderItem={requestsData => (
              <RequestChat requestsData={requestsData} navigation={navigation} currentUser={currentUser}/>
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
  const { requestsData, navigation, currentUser} = props;
  let count = 0;

  return (
    <View style={styles.separacion}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Chat", {
            name: currentUser.name,
            _id: currentUser.id,
            avatar: currentUser.photo,
            requestID: requestsData.item[3],
            count: count
          })
        }
      >
        <View style={styles.tarjeta}>
          <View style={styles.row}>
            <Avatar
              rounded
              size="large"
              containerStyle={styles.userInfoAvatar}
              source={{
                uri:
                  requestsData.item[2]
              }}
            />
            <View style={styles.column_left}>
              <Text style={styles.nameUser}> {requestsData.item[0]} </Text>
            </View>
            <View style={styles.column_right}>
              <Text style={styles.typeRequest}> {requestsData.item[1].substring(0, 1).toUpperCase() + requestsData.item[1].substring(1, requestsData.item[1].size)} </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8
  },
  column_left: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 20
  },
  column_right: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 20
  },
  tarjeta: {
    borderRadius: 25,
    borderStyle: "solid",
    backgroundColor: "#aa8caf"
  },
  separacion: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  userInfoAvatar: {
    marginRight: 20
  },
  nameUser: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold"
  },
  typeRequest: {
    color: "yellow"
  }
});

