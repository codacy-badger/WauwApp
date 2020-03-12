import { createStackNavigator } from "react-navigation-stack";
import NotificationsScreen from "../screens/Notifications";

const NotificationsScreenStack = createStackNavigator({
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      title: "Notificaciones",
      headerTitleAlign: "center"
    })
  }
});

export default NotificationsScreenStack;
