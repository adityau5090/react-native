import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const CartScreen = () => {
    const navigation = useNavigation<any>()
  return (
    <View>
      <Text>CartScreen</Text>
      <Button title='Home' onPress={() => navigation.popToTop()} />
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({})