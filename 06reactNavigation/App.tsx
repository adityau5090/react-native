import DynamicStackNavigator from "./src/navigator/stack/DynamicStackNavigator";
import StaticStackNavigator from "./src/navigator/stack/StaticStackNavigator";
import StaticTabNavigator from "./src/navigator/tabs/StaticTabNavigator";
import DynamicTabNavigator from "./src/navigator/tabs/DynamicTabNavigator";
import StaticDrawerNavigator from "./src/navigator/drawer/StaticDrawerNavigator";
import DynamicDrawerNavigator from "./src/navigator/drawer/DynamicDrawerNavigator";

export default function App(){
  return (
    <>
    {/* <StaticStackNavigator /> */}
    {/* <DynamicStackNavigator /> */}
    {/* <StaticTabNavigator /> */}
    {/* <DynamicTabNavigator /> */}
    {/* <StaticDrawerNavigator /> */}
    <DynamicDrawerNavigator />
    </>
  ) 
}