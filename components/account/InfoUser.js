import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import {db} from "../population/config.js";

export default function InfoUser(props) {
    const { userInfo } = props;

    changeAvatar = () => {
        console.log("Estás cambiando el avatar...");
    }

    const actualizaNombre = () => {
        var userData = {
            avgScore: userInfo.avgScore,
            description: userInfo.description,
            dni: userInfo.dni,
            id: "-M2POJeCJGr41m8jreT8",
            name: "Pablo",
            paypalURL: userInfo.paypalURL,
            petNumber: userInfo.petNumber,
            photo: userInfo.photo,
            surname: userInfo.surname,
            wauwPoints: userInfo.wauwPoints
        }
        db.ref("wauwers").child("id").update(userData);
    }

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
                            "https://cdn4.iconfinder.com/data/icons/rounded-set-1/512/User-512.png"
                    }}
                />

                <View>
                    <Text style={styles.displayName}> {userInfo.name} </Text>
                    <Text>{userInfo.surname}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.userWauwPoints}>Wauw Points: {userInfo.wauwPoints}</Text>
            </View>

            <View >
                <Text style={styles.titleDescription}>Descripción</Text>
                <Text style={styles.userDescription}>{userInfo.description}</Text>
            </View>
            <Button onPress={actualizaNombre}/>
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
        backgroundColor: "#4cd0e1"
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: 'bold'
    },
    userDescription: {
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 30,
        paddingLeft: 30
    },
    titleDescription: {
        paddingLeft: 30,
        paddingBottom: 5,
        fontSize: 20
    },
    userWauwPoints: {
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 15,
        fontWeight: 'bold'
    }
});