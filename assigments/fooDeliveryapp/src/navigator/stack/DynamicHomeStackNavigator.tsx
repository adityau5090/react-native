import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/mainScreens/Home/HomeScreen";
import ResturantScreen from "../../screens/mainScreens/Home/ResturantScreen";
import CartScreen from "../../screens/mainScreens/Home/CartScreen";
import { Image } from "react-native";


const HomeStack = createNativeStackNavigator()

const MyHomeStack = () => {
    // const route = useRoute();
    return (
        <HomeStack.Navigator screenOptions={{
            animation: "slide_from_right",
        }} >
            <HomeStack.Screen name="Home" component={HomeScreen}  
            options={{
                title: "Bite",
                headerTitle: () => (
                    <Image 
                    source={require("../../../assets/Logo.png")}
                    style={{ width: 80, height: 80, resizeMode: "contain"}}
                    />
                ),
                headerStyle: {
                    backgroundColor: 'green',
                },
                headerTintColor: "#fff",

            }}
            />
            <HomeStack.Screen name="Resturant" component={ResturantScreen} 
             options={({route}: any) => ({
                title: route.params?.name ||  "Resturant",
                headerStyle: {
                    backgroundColor: 'green',
                },
                headerTintColor: "#fff",
                headerBackTitle: "Back",
            })}
            />
            <HomeStack.Screen name="Cart" component={CartScreen}
            options={{
    title: "Your Cart",
    headerStyle: {
      backgroundColor: "green",
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