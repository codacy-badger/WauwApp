import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import * as firebase from "firebase";

function Wauwer(props) {
    const { wauwer, navigation } = props;
    const { name, address, description, images } = restaurant.item.restaurant;
    const [photoWauwer, setPhotoWauwer] = useState(null);
  
    useEffect(() => {
      const photoWauwer = () =>{
          
      firebase
        .storage()
        .ref(`wauwer-photo/${photo}`)
        .getDownloadURL()
        .then(result => {
          setPhotoWauwer(result);
        });
    }
    })
  
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Wauwer", {
            wauwer: wauwer.item.wauwer
          })
        }
      >
        <View style={styles.viewWauwer}>
          <View style={styles.viewWauwerImage}>
            <Image
              resizeMode="cover"
              source={{ uri: photoWauwer }}
              style={styles.photoWauwer}
              PlaceholderContent={<ActivityIndicator color="fff" />}
            />
          </View>
          <View>
            <Text style={styles.wauwerName}>{name}</Text>
            <Text style={styles.wauwerSurname}>{surname}</Text>
            <Text style={styles.wauwerDni}>{dni}</Text>
            <Text style={styles.petNumber}>{petNumber}</Text>
            <Text style={styles.petDescription}>
              {description.substr(0, 60)}...
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  const styles = StyleSheet.create({
    loadingWauwers: {
      marginTop: 20,
      alignItems: "center"
    },
    viewWauwer: {
      flexDirection: "row",
      margin: 10
    },
    viewWauwerImage: {
      marginRight: 15
    },
    imageWauwer: {
      width: 80,
      height: 80
    },
    wauwerName: {
      fontWeight: "bold"
    },
    wauwerAddress: {
      paddingTop: 2,
      color: "grey"
    },
    wauwerDescription: {
      paddingTop: 2,
      color: "grey",
      width: 300
    },
    loaderWauwers: {
      marginTop: 10,
      marginBottom: 10
    },
    notFoundWauwer: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: "center"
    }
  });