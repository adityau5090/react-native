import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DynamicStackNavigator } from './src/navigator/stack/DynamicStackNavigator';
import AuthContextProvider from './src/context/AuthContextProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
      <SafeAreaView style={{ flex: 1}}>
        <AuthContextProvider>
        <DynamicStackNavigator />
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
