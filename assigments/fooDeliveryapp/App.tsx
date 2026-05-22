import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DynamicStackNavigator } from './src/navigator/stack/DynamicStackNavigator';
import AuthContextProvider from './src/context/AuthContextProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartContextProvider from './src/context/CartContextProvider';

export default function App() {
  return (
      <SafeAreaView style={{ flex: 1}}>
        <AuthContextProvider>
          <CartContextProvider>
            <DynamicStackNavigator />
          </CartContextProvider>
      </AuthContextProvider>
      </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
