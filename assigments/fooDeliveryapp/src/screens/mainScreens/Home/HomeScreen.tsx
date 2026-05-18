import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation = useNavigation<any>()
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Resturant' onPress={() => navigation.navigate("Resturant", {
        name: "Pizza Hut",
        price: 299
      })} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})