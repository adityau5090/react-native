import {  NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import DetailScreen from '../../screens/DetailScreen';


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Details" component={DetailScreen} />
    </Drawer.Navigator>
  );
}

export default function DynamicDrawerNavigator() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}