import { createStackNavigator } from "react-navigation-stack";
import NotificationsScreen from "../screens/Notifications";

const NotificationsScreenStack = createStackNavigator({
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      title: "Notifications",
      headerTitleAlign: "center"
    })
  }
});

export default NotificationsScreenStack;
