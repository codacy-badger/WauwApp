import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home";
import AnimalSheltersScreen from "../screens/AnimalShelters";


const HomeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Inicio"
    })
  },
  AnimalShelters: {
    screen: AnimalSheltersScreen,
    navigationOptions: () => ({
      title: "Protectoras"
    })
  }
});

export default HomeScreenStack;