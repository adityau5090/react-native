import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import { Button } from '@react-navigation/elements'
import { useNavigation } from "@react-navigation/native"

const HomeScreen = () => {
    const navigation = useNavigation<any>()
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Go to Details' onPress={()=> navigation.navigate("Details")} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})