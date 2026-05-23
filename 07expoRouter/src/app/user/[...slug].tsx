import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const User = () => {
    const {slug} = useLocalSearchParams()
    console.log(slug)
  return (
    <View>
      <Text>User : {slug}</Text>
    </View>
  )
}

export default User

const styles = StyleSheet.create({})