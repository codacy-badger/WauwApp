import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/Profile/Profile";
import ProfileWalkerFormScreen from "../screens/Profile/ProfileWalkerForm";
import ProfileAddDogFormScreen from "../screens/Profile/ProfileAddDogForm";
import ProfileSitterFormScreen from "../screens/Profile/ProfileSitterForm";

const ProfileScreenStacks = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      title: "Mi perfil",
      headerTitleAlign: "center"
    })
  },
  ProfileWalkerForm: {
    screen: ProfileWalkerFormScreen,
    navigationOptions: () => ({
      title: "Datos de Paseador",
      headerTitleAlign: "center"
    })
  },
  ProfileSitterForm: {
    screen: ProfileSitterFormScreen,
    navigationOptions: () => ({
      title: "Datos de Cuidador",
      headerTitleAlign: "center"
    })
  },
  ProfileAddDogForm: {
    screen: ProfileAddDogFormScreen,
    navigationOptions: () => ({
      title: "Datos del Perro",
      headerTitleAlign: "center"
    })
  }
});

export default ProfileScreenStacks;
