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
      title: "Elige un Servicio",
      headerTitleAlign: "center"
    })
  },
  SearchWalks: {
    screen: SearchWalksScreen,
    navigationOptions: () => ({
      title: "Buscar Paseos",
      headerTitleAlign: "center"
    })
  },
  SearchAccommodations: {
    screen: SearchAccommodationsScreen,
    navigationOptions: () => ({
      title: "Buscar Alojamientos",
      headerTitleAlign: "center"
    })
  },
  CreateWalk: {
    screen: CreateWalkScreen,
    navigationOptions: () => ({
      title: "Crear Paseo",
      headerTitleAlign: "center"
    })
  },
  CreateAccommodation: {
    screen: CreateAccommodationScreen,
    navigationOptions: () => ({
      title: "Crear Alojamiento",
      headerTitleAlign: "center"
    })
  }
});

export default ServicesScreenStacks;
