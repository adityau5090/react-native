import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import { add } from "react-native/types_generated/Libraries/Animated/AnimatedExports"

const AuthContextProvider = ({ children } : any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [name, setName] = useState("Aditya");
  const [password, setPassword] = useState("123456");
  const [image, setImage] = useState("https://ik.imagekit.io/o6n27bufc/headshots/GWJChqAWEAAWboF_TirFkrTaf.jpeg?updatedAt=1778093710213");
  const [address, setAddress] = useState("Varanasi BHU Gate No.2");
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
    const loadAuth = async () => {
        const value = await AsyncStorage.getItem("isLoggedIn");
        const user = await AsyncStorage.getItem("user");

        if (value === "true" && user) {
            const parsedUser = JSON.parse(user);

            setIsLoggedIn(true);
            setName(parsedUser.name);
            setPassword(parsedUser.password);
            setImage(parsedUser.image);
            setAddress(parsedUser.address);
        }

        setIsLoading(false);
    };

    loadAuth();
}, []);

    const login = async (userData: any) => {
        setIsLoggedIn(true)
        setName(userData.name);
    setPassword(userData.password);
    setImage(userData.image);
    setAddress(userData.address);
        await AsyncStorage.setItem("isLoggedIn", "true")
        await AsyncStorage.setItem("user", JSON.stringify(userData));
    }


    const logout = async () => {
        setIsLoggedIn(false)
        await AsyncStorage.removeItem("isLoggedIn")
        await AsyncStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, name, password, image, address, login, logout, setName, setPassword, setImage, setAddress } as any}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider