import { createStackNavigator } from "react-navigation-stack";
import ServicesScreen from "../screens/Services";
import SearchAccommodationsScreen from "../screens/SearchAccommodations";
import ChangeAvailabilityScreen from "../screens/ChangeAvailability";
import CreateAccommodationScreen from "../screens/CreateAccommodation";
import SearchWalksScreen from "../screens/SearchWalks";
import CreateRequestScreen from "../screens/CreateRequestWalk";

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
  ChangeAvailability: {
    screen: ChangeAvailabilityScreen,
    navigationOptions: () => ({
      title: "Cambiar Disponibilidad",
      headerTitleAlign: "center"
    })
  },
  CreateRequestWalk: {
    screen: CreateRequestScreen,
    navigationOptions: () => ({
      title: "Crear Solicitud Paseo",
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
