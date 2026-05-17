import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native"

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
  return (
    <View>
      <Text>ProfilePage</Text>
      <Button title='Go to Home' onPress={()=> navigation.navigate("Home") } />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})