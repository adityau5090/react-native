import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";

import * as Notifications from "expo-notifications";

import Screen from "@/components/ui/Screen";
import { GlassCard } from "@/components/ui/GlassCard";
import { useTheme } from "@/theme";
import { useFocusEffect } from "expo-router";

export default function NotificationsScreen() {
  const colors = useTheme();

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const loadNotifications = async () => {
    const scheduled =
      await Notifications.getAllScheduledNotificationsAsync();

    setNotifications(scheduled);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNotifications();
    }, [])
  );

  const clearAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  setNotifications([]);

  Alert.alert(
    "Success",
    "All scheduled notifications cleared."
  );
};

  return (
    <Screen>
      <View style={styles.header}>
  <Text
    style={[
      styles.title,
      { color: colors.text },
    ]}
  >
    🔔 Scheduled Reminders
  </Text>

  {notifications.length > 0 && (
    <Pressable
      style={styles.clearButton}
      onPress={clearAllNotifications}
    >
      <Text style={styles.clearText}>
        Clear All
      </Text>
    </Pressable>
  )}
</View>

      {notifications.length === 0 ? (
        <GlassCard>
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
            }}
          >
            No scheduled notifications
          </Text>
        </GlassCard>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.identifier}
          renderItem={({ item }) => {
            const trigger =
              item.trigger as any;

            return (
              <GlassCard>
                <Text
                  style={[
                    styles.notificationTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {
                    item.content.title
                  }
                </Text>

                <Text
                  style={{
                    color:
                      colors.textSecondary,
                  }}
                >
                  {item.content.body}
                </Text>

                <Text
                  style={{
                    color:
                      colors.primary,
                    marginTop: 10,
                  }}
                >
                  ⏰{" "}
                  {trigger?.hour !==
                  undefined
                    ? `${trigger.hour}:${String(
                        trigger.minute
                      ).padStart(
                        2,
                        "0"
                      )}`
                    : "Custom Schedule"}
                </Text>
              </GlassCard>
            );
          }}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20,
},

clearButton: {
  backgroundColor: "#ff4d4d",
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 12,
},

clearText: {
  color: "#fff",
  fontWeight: "700",
},
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },

  notificationTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
});