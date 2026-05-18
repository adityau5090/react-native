import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AuthContextProvider = ({ children }) => {
    const [ isLoggedIn, setIsLoggedIn] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        const loadAuth = async () => {
            const value = await AsyncStorage.getItem("isLoggedIn");
            if(value === 'true'){
                setIsLoggedIn(true);
            }
            setIsLoading(false);
        }
        loadAuth()
    }, [])

    const login = async () => {
        setIsLoggedIn(true)
        await AsyncStorage.setItem("isLoggedIn", "true")
    }
    const logout = async () => {
        setIsLoggedIn(false)
        await AsyncStorage.removeItem("isLoggedIn")
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider