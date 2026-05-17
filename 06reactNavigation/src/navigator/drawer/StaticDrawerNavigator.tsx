import {createStaticNavigation} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import DetailScreen from '../../screens/DetailScreen';

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Details: DetailScreen
  },
});

const Navigation = createStaticNavigation(MyDrawer);

export default function StaticDrawerNavigator() {
  return <Navigation />;
}