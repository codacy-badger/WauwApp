import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/Profile";

const ProfileScreenStacks = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: "Perfil",
      headerTitleAlign: "center"
    })
  }
});

export default ProfileScreenStacks;
