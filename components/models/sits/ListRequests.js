import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Image } from "react-native-elements";

export default function ListRequests(props){
    const {requestList}  = props;
    const [loading, setLoading] = useState(false);
    if (loading){
        return (
            <View>
                <Text> Cargando... </Text>
            </View>
        );
    }else{
    return (
        <SafeAreaView>
            <ScrollView>
            { requestList ? (
                <FlatList
                data = {requestList}
                renderItem= {  request  => (
                    <Request request = {request.item} />
                )}
                keyExtractor= { (request) => {request.id}}
                />
            ) : (
                <View>
                    <Text> No hay usuarios </Text>
                </View>
            )}
            </ScrollView>
        </SafeAreaView>
    );
            }
}

function Request(request){
    return (
        <View style={styles.separacion}>
        <TouchableOpacity
        onPress={() =>
            navigation.navigate("Request", {
              request: request.request
            })
          }
        >
                <View style={styles.tarjeta}>
                    <View style={styles.row}>
                        <View style={styles.column_left}>
                            <Text> {request.request.info} </Text>
                        </View>
                        <View style={styles.column_right}>
                            <Text> {request.request.quantity} €</Text>
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
        padding: 10
        },
    column: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
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
        elevation: 1, 
        backgroundColor: "#fff",
        borderRadius: 25,
        borderStyle: "solid"
    },
    separacion: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});  