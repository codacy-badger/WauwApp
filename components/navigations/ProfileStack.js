import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/Profile/Profile";
import ProfileWalkerFormScreen from "../screens/Profile/ProfileWalkerForm";
import ProfileAddDogFormScreen from "../screens/Profile/ProfileAddDogForm";
import ProfileSitterFormScreen from "../screens/Profile/ProfileSitterForm";
import ProfileLocationFormScreen from "../screens/Profile/ProfileLocationForm";
import ProfileDrawerNavigator from "./ProfileDrawer";
import ShowRequestScreen from "../screens/Profile/ShowRequest";

const ProfileScreenStacks = createStackNavigator({
  ProfileDrawer: {
    screen: ProfileDrawerNavigator,
    navigationOptions: () => ({
      title: "Mi Perfil",
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
  },
  ProfileLocationForm: {
    screen: ProfileLocationFormScreen,
    navigationOptions: () => ({
      title: "Escoger Localización",
      headerTitleAlign: "center"
    })
  },
  ShowRequest: {
    screen: ShowRequestScreen,
    navigationOptions: () => ({
      title: "Escoger Localización",
      headerTitleAlign: "center"
    })
  }
});

export default ProfileScreenStacks;
