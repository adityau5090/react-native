import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  const isProtected = true
  return (
    
      <Stack>
        <Stack.Protected guard={isProtected}>
          <Stack.Screen name="index" options={{}} />
          <Stack.Screen name="about" options={{}} />
          
        </Stack.Protected>

        <Stack.Protected guard={!isProtected}>
          <Stack.Screen name="(auth)" options={{headerShown: false}} /> 
        </Stack.Protected>
        
         
        
      </Stack>
  ) 
}
