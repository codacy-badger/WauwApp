import { createStackNavigator } from "react-navigation-stack";
import SearchWalksScreen from "../screens/SearchWalks";
import CreateRequestScreen from "../screens/CreateRequest";

const SearchWalksScreenStacks = createStackNavigator({
  SearchWalks: {
    screen: SearchWalksScreen,
    navigationOptions: () => ({
      title: "Buscar Paseos",
      headerTitleAlign: "center"
    })
  },
  CreateRequest: {
    screen: CreateRequestScreen,
    navigationOptions: () => ({
      title: "Crear Solicitud",
      headerTitleAlign: "center"
    })
  }
});
export default SearchWalksScreenStacks;
