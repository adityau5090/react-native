import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native"

const ProfileScreen = ({route}: any) => {
    const navigation = useNavigation<any>();
    const {username} = route.params;
  return (
    <View>
      <Text>{username}</Text>
      <Button title='Go to Home' onPress={()=> navigation.popToTop() } />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})