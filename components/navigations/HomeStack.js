import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/Home";

const HomeScreenStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: "Home",
      headerTitleAlign: "center"
    })
  }
});

export default HomeScreenStack;
