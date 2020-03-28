import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home";
import AnimalSheltersScreen from "../screens/AnimalShelters";

const HomeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Inicio",
      headerTitleAlign: "center"
    })
  },
  AnimalShelters: {
    screen: AnimalSheltersScreen,
    navigationOptions: () => ({
      title: "Protectoras",
      headerTitleAlign: "center"
    })
  }
});

export default HomeScreenStack;
