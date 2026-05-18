import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const ResturantScreen = () => {
    const navigation = useNavigation<any>()
    const route = useRoute()

    const {name, price} : any = route.params;
    // console.log(props)
  return (
    <View>
      <Text>ResturantScreen</Text>
      <Text>Resturant name : {name}</Text>
      <Text>Price : {price}</Text>
      <Button title='Cart' onPress={() => navigation.navigate('Cart')} />
    </View>
  )
}

export default ResturantScreen

const styles = StyleSheet.create({})