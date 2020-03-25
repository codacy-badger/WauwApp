import { createStackNavigator } from "react-navigation-stack";
import ChatsScreen from "../screens/Chats";

const ChatsScreenStack = createStackNavigator({
  Chats: {
    screen: ChatsScreen,
    navigationOptions: () => ({
      title: "Conversaciones",
      headerTitleAlign: "center"
    })
  }
});

export default ChatsScreenStack;
