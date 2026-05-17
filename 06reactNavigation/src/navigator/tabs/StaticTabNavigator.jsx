import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import DetailScreen from "../../screens/DetailScreen";
import { createStaticNavigation } from "@react-navigation/native";

const MyTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Details: DetailScreen
  }
})

const Navigation = createStaticNavigation(MyTabs)

export default function StaticTabNavigator(){
    return <Navigation />
}