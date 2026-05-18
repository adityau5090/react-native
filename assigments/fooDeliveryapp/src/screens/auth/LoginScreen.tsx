import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'

const LoginScreen = () => {

    const { login } : any = useContext(AuthContext)
  return (
    <View>
      <Text>LoginScreen</Text>
      <Pressable onPress={login}><Text>Login</Text></Pressable>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})