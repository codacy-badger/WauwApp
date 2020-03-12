import { createStackNavigator } from "react-navigation-stack";
import ServicesScreen from "../screens/Services";
import SearchWalksScreen from "../screens/SearchWalks";
import SearchAccommodationsScreen from "../screens/SearchAccommodations";
import CreateWalkScreen from "../screens/CreateWalk";
import CreateAccommodationScreen from "../screens/CreateAccommodation";

const ServicesScreenStacks = createStackNavigator({
  Services: {
    screen: ServicesScreen,
    navigationOptions: () => ({
      title: "Choose a Service",
      headerTitleAlign: "center"
    })
  },
  SearchWalks: {
    screen: SearchWalksScreen,
    navigationOptions: () => ({
      title: "Search Walks",
      headerTitleAlign: "center"
    })
  },
  SearchAccommodations: {
    screen: SearchAccommodationsScreen,
    navigationOptions: () => ({
      title: "Search Accommodations",
      headerTitleAlign: "center"
    })
  },
  CreateWalk: {
    screen: CreateWalkScreen,
    navigationOptions: () => ({
      title: "Create Walk",
      headerTitleAlign: "center"
    })
  },
  CreateAccommodation: {
    screen: CreateAccommodationScreen,
    navigationOptions: () => ({
      title: "Create Accommodation",
      headerTitleAlign: "center"
    })
  }
});

export default ServicesScreenStacks;
