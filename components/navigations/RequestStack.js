import { createStackNavigator } from "react-navigation-stack";
import { CreateRequestScreen } from "../screens/CreateRequest";

const RequestScreenStacks = createStackNavigator({
    CreateRequest: {
       screen: CreateRequestScreen,
       navigationOptions: ()=> ({
           title: "Crear Solicitud",
           headerTitleAlign: "center",
       })
    },

});

export default RequestScreenStacks;