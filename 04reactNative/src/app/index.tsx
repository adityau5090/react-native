import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'

const themes = {
  light: {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#1A1A1A',
    subtext: '#666666',
    accent: '#6C63FF',
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    subtext: '#AAAAAA',
    accent: '#9D97FF',
  },
};

const HomeScreen = () => {
  const systemScheme  = useColorScheme()
  console.log(systemScheme)

  const [manualDark, setManualDark] = useState<boolean | null>(null)

  const isDark  = manualDark  !== null ? manualDark : systemScheme === "dark"

  const theme = isDark ? themes.dark : themes.light
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  card: { padding: 20, borderRadius: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 4 },
  label: { fontSize: 16 },

})