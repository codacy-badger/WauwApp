import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, Button, View, Image } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};


function showRequest(props) {
    const { navigation } = props;

    return (
        <View>
           <Text>show request</Text>
        </View>
    );
}

export default withNavigation(showRequest);