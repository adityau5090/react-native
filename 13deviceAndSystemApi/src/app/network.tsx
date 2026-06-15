import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Network from "expo-network"
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { SafeAreaView } from 'react-native-safe-area-context'

const NetworkTab = () => {
    const liveState = Network.useNetworkState()
    const [snapShot, setSnapShot] = useState<Network.NetworkState | null>(null)
    const [ipAddrees, setIpAddrees] = useState<string | null>(null)
    const [airoplaneMode, setAiroplaneMode] = useState<boolean | null>(null)
    const [events, setEvents] = useState<string[]>([])

    useEffect(() => {
        const subscription = Network.addNetworkStateListener((state) => {
            console.log(state);
            const line = `${state.type ?? "Unknown"} . connected=${String(state.isConnected)} . internet=${String(state.isInternetReachable)}`
            setEvents((current)=> [line, ...current].slice(0,5));
        })

        return () => subscription.remove();
    }, [])

    const refreshSnapshot = async () => {
        const state = await Network.getNetworkStateAsync();
        setSnapShot(state)
    }

    const refreshIp = async () => {
        try {
            const ip = await Network.getIpAddressAsync();
            setIpAddrees(ip)
        } catch (error) {
            setIpAddrees(error instanceof Error ? error.message : "Unavailable")
        }
    }

    const refreshAirplaneMode = async () => {
        if(Platform.OS !== 'android'){
            setAiroplaneMode(null)
        }
        const enabled = await Network.isAirplaneModeEnabledAsync();
        setAiroplaneMode(enabled) 
    }
  return (
  <SafeAreaView>
    <ScrollView
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
    <ThemedText type="subtitle" style={styles.title}>
      📡 Network Monitor
    </ThemedText>

    <ThemedView style={styles.card}>
      <ThemedText type="subtitle">Live State</ThemedText>

      <ThemedText>Type: {String(liveState.type)}</ThemedText>
      <ThemedText>
        Connected: {String(liveState.isConnected)}
      </ThemedText>
      <ThemedText>
        Internet Reachable: {String(liveState.isInternetReachable)}
      </ThemedText>
    </ThemedView>

    <ThemedView style={styles.card}>
      <ThemedText type="subtitle">IP Address</ThemedText>

      <ThemedText>{ipAddrees ?? "Not loaded"}</ThemedText>

      <Pressable
        style={styles.button}
        onPress={refreshIp}
      >
        <ThemedText style={styles.buttonText}>
          Refresh IP
        </ThemedText>
      </Pressable>
    </ThemedView>

    <ThemedView style={styles.card}>
      <ThemedText type="subtitle">
        Airplane Mode
      </ThemedText>

      <ThemedText>
        {airoplaneMode === null
          ? "Unsupported / Not checked"
          : airoplaneMode
          ? "✈️ Enabled"
          : "📶 Disabled"}
      </ThemedText>

      <Pressable
        style={styles.button}
        onPress={refreshAirplaneMode}
      >
        <ThemedText style={styles.buttonText}>
          Check Airplane Mode
        </ThemedText>
      </Pressable>
    </ThemedView>

    <ThemedView style={styles.card}>
      <ThemedText type="subtitle">Snapshot</ThemedText>

      <ThemedText>
        Type: {snapShot?.type ?? "Not Loaded"}
      </ThemedText>

      <ThemedText>
        Connected: {String(snapShot?.isConnected)}
      </ThemedText>

      <ThemedText>
        Internet: {String(snapShot?.isInternetReachable)}
      </ThemedText>

      <Pressable
        style={styles.button}
        onPress={refreshSnapshot}
      >
        <ThemedText style={styles.buttonText}>
          Refresh Snapshot
        </ThemedText>
      </Pressable>
    </ThemedView>

    <ThemedView style={styles.card}>
      <ThemedText type="subtitle">
        Recent Events
      </ThemedText>

      {events.length === 0 ? (
        <ThemedText>No events yet</ThemedText>
      ) : (
        events.map((event, index) => (
          <ThemedText
            key={`${event}-${index}`}
            style={styles.eventItem}
          >
            • {event}
          </ThemedText>
        ))
      )}
    </ThemedView>
  </ScrollView>
  </SafeAreaView>
);
}

export default NetworkTab

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },

  title: {
    marginBottom: 8,
  },

  card: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(128,128,128,0.2)",
  },

  button: {
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#0A7EA4",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  eventItem: {
    paddingVertical: 2,
    opacity: 0.9,
  },
});