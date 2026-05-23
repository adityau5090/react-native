import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const UserName = () => {
    const {username} = useLocalSearchParams();
  return (
    <View>
      <Text>UserName: {username}</Text>
    </View>
  )
}

export default UserName

const styles = StyleSheet.create({})