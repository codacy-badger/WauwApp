import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/Profile";

const ProfileScreenStacks = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: "Profile",
      headerTitleAlign: "center"
    })
  }
});

export default ProfileScreenStacks;
