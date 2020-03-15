import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ListWauwers(props){
    const {wauwerList}  = props;
    return (
        <SafeAreaView>
            <ScrollView>
            { wauwerList ? (
                <FlatList
                data = {wauwerList}
                renderItem= {  wauwer  => (
                    <Wauwer wauwer = {wauwer.item} />
                )}
                keyExtractor= { (wauwer) => {wauwer.id}}
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

function Wauwer(wauwer){
    console.log(wauwer);
    return (
        <TouchableOpacity
            
        >
            <View>
                <View>
                    <Text> {wauwer.wauwer.name} </Text>
                    <Text> {wauwer.wauwer.id} </Text>
                    <Text> ===================== </Text>
                    
                </View>
            </View>
        </TouchableOpacity>
    );
}