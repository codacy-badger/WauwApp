import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import HomeScreenStack from "./HomeStack";
import NotificationsScreenStack from "./NotificationsStack";
import ServicesScreenStacks from "./ServicesStacks";
import ProfileScreenStack from "./ProfileStack";
import { HeaderStyleInterpolators } from "react-navigation-stack";

const NavigationStacks = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="home"
            size={35}
            color={tintColor}
          />
        ),
        tabBarOptions: {
          activeBackgroundColor: "#f7ba7c",
          activeTintColor: "#ffffff",
          showLabel: false,
          showIcon: true
        }
      })
    },
    Notifications: {
      screen: NotificationsScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Notifications",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="bell"
            size={35}
            color={tintColor}
          />
        )
      })
    },
    Services: {
      screen: ServicesScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Services",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="dog-service"
            size={35}
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
            size={35}
            color={tintColor}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Home",
    order: ["Home", "Notifications", "Services", "Profile"],
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      inactiveTintColor: "#6c7075",
      activeTintColor: "#ffffff",
      activeBackgroundColor: "#4cd0e1",
      labelStyle: {
        fontSize: 13,
        fontWeight: "bold"
      }
    }
  }
);

export default createAppContainer(NavigationStacks);
