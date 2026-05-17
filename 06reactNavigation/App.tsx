import DynamicStackNavigator from "./src/navigator/stack/DynamicStackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import DetailScreen from "./src/screens/DetailScreen";

export default function App(){
  return (
    <>
    <DynamicStackNavigator />
    </>
  ) 
}