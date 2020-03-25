import { createStackNavigator } from "react-navigation-stack";
import { CreateRequestScreen } from "../screens/CreateRequest";
import {CreateRequestAccommodationScreen} from "../screens/CreateRequestAccommodation";


const RequestScreenStacks = createStackNavigator({
    CreateRequest: {
       screen: CreateRequestScreen,
       navigationOptions: ()=> ({
           title: "Crear Solicitud",
           headerTitleAlign: "center",
       })
    },
    CreateRequestAccommodation: {
        screen: CreateRequestAccommodationScreen,
        navigationOptions: () => ({
          title: "Crear Solicitud Alojamiento",
          headerTitleAlign: "center"
        })
      }

});

export default RequestScreenStacks;