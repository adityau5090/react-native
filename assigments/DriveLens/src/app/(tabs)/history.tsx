import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  Colors,
  Spacing,
} from "@/theme";

import { useDriveHistory } from "@/hooks/useDriveHistory";

import { useHistoryAnalytics } from "@/hooks/useHistoryAnalytics";

import { HistorySessionCard } from "@/components/cards/HistorySessionCard";

import { HistoryAnalyticsCard } from "@/components/cards/HistoryAnalyticsCard";
import { Alert } from "react-native";
import { clearHistory, deleteSession, logout } from "@/storage/sessionStorage";
import { Ionicons } from "@expo/vector-icons";

export default function HistoryScreen() {
  const {sessions,loading, refresh} = useDriveHistory();

  const analytics = useHistoryAnalytics(sessions);

  if (
    !loading &&
    sessions.length === 0
  ) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View
          style={styles.emptyContainer}
        >
          <Text
            style={styles.emptyEmoji}
          >
            🚗
          </Text>

          <Text
            style={styles.emptyTitle}
          >
            No Drives Yet
          </Text>

          <Text
            style={
              styles.emptySubtitle
            }
          >
            Complete your first
            drive session to see
            your history here.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = (sessionId: string) => {
    Alert.alert(
      "Delete Drive",
      "This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style:
            "destructive",
          onPress:
            async () => {
              await deleteSession(
                sessionId
              );

              refresh();
            },
        },
      ]
    );
  };

  const handleClear = () => {
    Alert.alert(
      "Clear History",
      "Delete all drives?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Delete",
          style:
            "destructive",
          onPress:
            async () => {
              await clearHistory();
              refresh();
            },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are u sure ?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Logout",
          style:
            "destructive",
          onPress:
            async () => {
              await logout();
              refresh();
            },
        },
      ]
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <FlatList
        data={sessions}
        keyExtractor={(item) =>
          item.id
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.content
        }
        ListHeaderComponent={
          <>
            <View style={styles.headContainer}>
              <View>
                <Text
              style={styles.title}
            >
              Drive History
            </Text>

            <Text
              style={styles.subtitle}
            >
              Track your driving
              performance over
              time
            </Text>
              </View>

              <Pressable onPress={handleClear} style={{ justifyContent: "center", alignItems: "center",}}>
                <Ionicons name="trash" size={18} color={"red"} style={{}} />
                <Text style={styles.deleteTest}>Clear Data</Text>
              </Pressable>
              <Pressable onPress={handleLogout} style={{ justifyContent: "center", alignItems: "center",}}>
                <Ionicons name="trash" size={18} color={"tomato"} style={{}} />
                <Text style={styles.deleteTest}>Logout</Text>
              </Pressable>
            </View>

            <HistoryAnalyticsCard
              totalDrives={
                analytics.totalDrives
              }
              totalXP={
                analytics.totalXP
              }
              averageScore={
                analytics.averageScore
              }
              bestScore={
                analytics.bestScore
              }
            />

            <Text
              style={
                styles.sectionTitle
              }
            >
              Recent Drives
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <HistorySessionCard
            session={item}
            onDelete={handleDelete}
          />
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height:
                Spacing.md,
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,

      backgroundColor:
        Colors.background,
    },
    headContainer:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // gap: 2
    },

    content: {
      padding:
        Spacing.md,

      paddingBottom: 120,
    },

    title: {
      color:
        Colors.text,

      fontSize: 32,

      fontWeight: "800",
    },

    subtitle: {
      color:
        Colors.textSecondary,

      marginTop: 6,

      marginBottom: 20,
    },

    sectionTitle: {
      color:
        Colors.text,

      fontSize: 18,

      fontWeight: "700",

      marginTop: 24,

      marginBottom: 12,
    },

    emptyContainer: {
      flex: 1,

      justifyContent:
        "center",

      alignItems: "center",

      padding: 24,
    },

    emptyEmoji: {
      fontSize: 64,
    },

    emptyTitle: {
      color:
        Colors.text,

      fontSize: 24,

      fontWeight: "700",

      marginTop: 16,
    },

    emptySubtitle: {
      color:
        Colors.textSecondary,

      textAlign:
        "center",

      marginTop: 8,

      lineHeight: 22,
    },
    deleteTest: {
      color: "red",
      fontSize: 12,
      //  border: 1,
      borderWidth: 1,
       borderColor: "red",
       paddingVertical: 1,
       paddingHorizontal: 4,
       borderRadius: 30
    }
  });