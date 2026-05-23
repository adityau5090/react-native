import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from "expo-router"

const Docs = () => {
    const {topicname} = useLocalSearchParams();
  return (
    <View>
      <Text>Docs: {topicname}</Text>
    </View>
  )
}

export default Docs

const styles = StyleSheet.create({})