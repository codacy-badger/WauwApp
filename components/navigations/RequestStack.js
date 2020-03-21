import { createStackNavigator } from "react-navigation-stack";
import { CreateRequestScreen } from "../screens/CreateRequestWalk";

const RequestScreenStacks = createStackNavigator({
    CreateRequestWalk: {
       screen: CreateRequestScreen,
       navigationOptions: ()=> ({
           title: "Crear Solicitud Paseo",
           headerTitleAlign: "center",
       })
    },

});

export default RequestScreenStacks;