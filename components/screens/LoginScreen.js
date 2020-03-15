import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import { db } from "../population/config";

import * as Google from "expo-google-app-auth";

import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};
// const IOS_CLIENT_ID =
//   "your-ios-client-id";

export default class LoginScreen extends Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    //console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function(result) {
              console.log("user signed in ");
              if (result.additionalUserInfo.isNewUser) {
                //Rol creado
                let idRol = db
                  .ref()
                  .child("rol")
                  .push().key;
                let query = db.ref().child("rol/" + idRol);
                query.set({
                  id: idRol,
                  nombre: "wauwer"
                });

                //Cuenta de usuario creada
                let idUA = db
                  .ref()
                  .child("user_account")
                  .push().key;
                query = db.ref().child("user_account/" + idUA);

                query.set({
                  id: idUA,
                  username: "",
                  password: "",
                  rolId: idRol
                });
                console.log("Cuenta de usuario creada");

                let idWauwer = db
                  .ref()
                  .child("wauwers")
                  .push().key;
                
                console.log(idWauwer);
                query = db.ref().child("wauwers/" + idWauwer);
                query.set({
                  id: idWauwer,
                  name: result.additionalUserInfo.profile.given_name,
                  surname: result.additionalUserInfo.profile.family_name,
                  dni: "",
                  photo: result.additionalUserInfo.profile.picture,
                  avgScore: 2.5,
                  user_accountId: idUA,
                  paypalURL: "",
                  description: "",
                  wauwPoints: 0,
                  price: 5,
                  petNumber: 0
                });
                console.log("Usuario añadido con éxito");

                //Google query added to get the user in case of database dump
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  }); /*

                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
                  */
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  signInWithGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId:
          "23003798547-73ukaubbmep7m4he496q87q77ah99ej4.apps.googleusercontent.com",
        androidClientId:
          "23003798547-t74fgtanjhqe7mbdd9e2trcvvps4fahj.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in with Google" onPress={this.signInWithGoogle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
