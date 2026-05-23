import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
       <Link href={"/about"}>About</Link>
      {/*<Link href={"/name"}>User</Link> */}
      {/* <Link href={"/user/suraj/hitesh"}>User</Link> */}
      <Link href={"/login"}>Login</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})