import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreenStack from "./HomeStack";
import ChatScreenStack from "./ChatStack";
import SearchScreenStacks from "./SearchStacks";
import ProfileScreenStack from "./ProfileStack";

const NavigationStacks = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Chat: {
      screen: ChatScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Chat",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="chat"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Profile: {
      screen: ProfileScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Home",
    order: ["Home", "Chat", "Search", "Profile"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

export default createAppContainer(NavigationStacks);
