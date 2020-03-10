import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "../screens/Search";
import SearchWalksScreen from "../screens/SearchWalks";
import SearchAccommodationsScreen from "../screens/SearchAccommodations";

const SearchScreenStacks = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: () => ({
      title: "Search"
    })
  },
  SearchWalks: {
    screen: SearchWalksScreen,
    navigationOptions: () => ({
      title: "Search Walks"
    })
  },
  SearchAccommodations: {
    screen: SearchAccommodationsScreen,
    navigationOptions: () => ({
      title: "Search Accommodations"
    })
  }
});

export default SearchScreenStacks;
