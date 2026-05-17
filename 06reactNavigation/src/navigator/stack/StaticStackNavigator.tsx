import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../../screens/DetailScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import HomeScreen from "../../screens/HomeScreen";

const Stack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Details: DetailScreen,
    Profile: ProfileScreen
  }
});

const Navigation = createStaticNavigation(Stack);

export default function StaticStackNavigator(){
    return <Navigation />
}