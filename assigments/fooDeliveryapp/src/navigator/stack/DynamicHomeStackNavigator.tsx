import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/mainScreens/Home/HomeScreen";
import ResturantScreen from "../../screens/mainScreens/Home/ResturantScreen";
import CartScreen from "../../screens/mainScreens/Home/CartScreen";
import { useRoute } from "@react-navigation/native"

const HomeStack = createNativeStackNavigator()

const MyHomeStack = () => {
    // const route = useRoute();
    return (
        <HomeStack.Navigator >
            <HomeStack.Screen name="Home" component={HomeScreen}  
            options={{
                title: "Food App",
                headerStyle: {
                    backgroundColor: '#111',
                },
                headerTintColor: "#fff"
            }}
            />
            <HomeStack.Screen name="Resturant" component={ResturantScreen} 
             options={({route}: any) => ({
                title: route.params?.name ||  "Resturant",
                headerStyle: {
                    backgroundColor: '#111',
                },
                headerTintColor: "#fff",
                headerBackTitle: "Back",
            })}
            />
            <HomeStack.Screen name="Cart" component={CartScreen}
            options={{
    title: "Your Cart",
    headerStyle: {
      backgroundColor: "#111",
    },
    headerTintColor: "#fff",
    headerBackTitle: "Back",
  }}
            />
        </HomeStack.Navigator>
    )
}

export const DynamicHomeStackNavigator = () => {
    return <MyHomeStack />
}