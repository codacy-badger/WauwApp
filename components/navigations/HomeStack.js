import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home";
import AnimalSheltersScreen from "../screens/AnimalShelters";
import PagoScreen from '../screens/Pago';


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
  },
  Pago: {
    screen: PagoScreen,
    navigationOptions: () => ({
      title: "Pago"
    })
  }
});

export default HomeScreenStack;