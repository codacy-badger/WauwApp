import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import MyRequestsScreen from "../screens/Profile/ProfileMyRequests";
import MyAccommodationsScreen from "../screens/Profile/ProfileMyAccommodations";
import MyWalksScreen from "../screens//Profile/ProfileMyWalks";
// import { Right } from 'native-base';
import ProfileScreen from "../screens/Profile/Profile";

const CustomDrawerComponent = props => (
  <SafeAreaView>
    <View
      style={{
        height: 150,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        source={require("../../assets/images/search-walks.png")}
        style={{ height: 120, width: 120, borderRadius: 60 }}
      />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

export default createDrawerNavigator(
  {
    Profiles: {
      screen: ProfileScreen,
      navigationOptions: {
        drawerLabel: "Mi Perfil",
        drawerIcon: ({ tintColor }) => <Icon name="cog" size={17} />
      }
    },
    MyRequests: {
      screen: MyRequestsScreen,
      navigationOptions: {
        drawerLabel: "Mis Solicitudes",
        drawerIcon: ({ tintColor }) => <Icon name="cog" size={17} />
      }
    },

    MyAccommodations: {
      screen: MyAccommodationsScreen,
      navigationOptions: {
        drawerLabel: "Mis Alojamientos",
        drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />
      }
    },

    MyWalks: {
      screen: MyWalksScreen,
      navigationOptions: {
        drawerLabel: "Mis Paseos",
        drawerIcon: ({ tintColor }) => <Icon name="user-circle" size={17} />
      }
    }
  },
  {
    drawerPosition: "right",
    contentComponent: CustomDrawerComponent
  }
);
