import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { db } from "../population/config.js";

export default function InfoUser(props) {
  const { userInfo, setReloadData } = props;

  changeAvatar = () => {
    console.log("Estás cambiando el avatar...");
    setReloadData(false);
  };

  const actualizaNombre = () => {
    var userData = {
      avgScore: 668
    };
    db.ref("wauwers")
      .child(userInfo.id)
      .update(userData);
  };

  return (
    <View>
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="large"
          showEditButton
          onEditPress={changeAvatar}
          containerStyle={styles.userInfoAvatar}
          source={{
            uri:
              "https://i.imgur.com/vEKMHsV.jpg"
          }}
        />

        <View>
          <Text style={styles.displayName}> {userInfo.name} </Text>
          <Text style={styles.emailStyle}>{userInfo.surname}</Text>
        </View>
      </View>

      <View>
        <Text style={styles.userWauwPoints}>
          Wauw Points: {userInfo.wauwPoints}
        </Text>
      </View>

      <View style={styles.descriptionGlobal}>
        <Text style={styles.titleDescription}>Descripción</Text>
        <Text style={styles.userDescription}>{userInfo.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#443099",
    borderRadius: 25
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold",
    color: 'white'
  },
  userDescription: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 15,
    backgroundColor: "#43B581",
    borderRadius: 25,
    color: 'white'
  },
  titleDescription: {
    paddingLeft: 30,
    paddingBottom: 5,
    fontSize: 20,
    backgroundColor: "#43B581",
    borderRadius: 25,
    color: 'white',
    paddingTop: 10
  },
  userWauwPoints: {
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: "bold"
  },
  descriptionGlobal: {
    backgroundColor: "#43B581",
    borderRadius: 25
  },
  emailStyle: {
    color: 'white'
  }
});
