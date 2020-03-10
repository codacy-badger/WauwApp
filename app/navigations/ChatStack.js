import { createStackNavigator } from "react-navigation-stack";
import ChatScreen from "../screens/Chat";

const ChatScreenStack = createStackNavigator({
  Chat: {
    screen: ChatScreen,
    navigationOptions: () => ({
      title: "Chat"
    })
  }
});

export default ChatScreenStack;
