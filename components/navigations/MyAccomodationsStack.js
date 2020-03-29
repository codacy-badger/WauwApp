import { createStackNavigator } from "react-navigation-stack";
import MyAccommodationsScreen from "../screens/Profile/ProfileMyAccommodations";
import EditDeleteAccommodationScreen from "../screens/EditDeleteAccommodation";

const MyAccomodationScreenStacks = createStackNavigator({
  MyAccommodations: {
    screen: MyAccommodationsScreen,
    navigationOptions: () => ({
      title: "Mis alojamientos",
      headerTitleAlign: "center"
    })
  },
  ChangeAccommodation: {
    screen: EditDeleteAccommodationScreen,
    navigationOptions: () => ({
      title: "Editar alojamiento",
      headerTitleAlign: "center"
    })
  }
});

export default MyAccomodationScreenStacks;
