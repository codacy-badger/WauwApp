import * as Font from "expo-font";
import { StyleSheet, Text, View } from 'react-native'; 
import {  createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './components/screens/LoginScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import LoadingScreen from './components/screens/LoadingScreen';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import { AppLoading } from "expo";
import Navigation from "./components/navigations/Navigation";
import React, { useState } from "react";

const getFonts = () =>
  Font.loadAsync({
    "opensans-regular": require("./assets/fonts/OpenSans-Regular.ttf")
  });
export default class App extends React.Component{
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (fontsLoaded) {
  render(){
    return <AppNavigator/>
  }
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen:LoadingScreen,
  LoginScreen:LoginScreen,
  DashboardScreen:DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});