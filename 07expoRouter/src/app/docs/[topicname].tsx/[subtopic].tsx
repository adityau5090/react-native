import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const SubTopic = () => {
    const { subtopic } = useLocalSearchParams()
  return (
    <View>
      <Text>SubTopic : {subtopic}</Text>
    </View>
  )
}

export default SubTopic

const styles = StyleSheet.create({})