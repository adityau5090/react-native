import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'

const LogoutScreen = () => {
  const { logout } : any = useContext(AuthContext);
  return (
    <Button title='Logout' onPress={logout} />
  )
}

export default LogoutScreen

const styles = StyleSheet.create({})