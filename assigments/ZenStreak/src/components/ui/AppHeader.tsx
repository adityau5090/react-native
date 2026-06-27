import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/theme";
import { useAuthStore } from "@/store/auth.store";

export default function AppHeader() {
  const colors = useTheme();

  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: colors.background,
      }}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View>
          <Text
            style={[
              styles.greeting,
              { color: colors.textSecondary },
            ]}
          >
            Welcome back 👋
          </Text>

          <Text
            style={[
              styles.name,
              { color: colors.text },
            ]}
          >
            {user?.name}
          </Text>
        </View>

        <Image
          source={{
            uri: user?.avatar,
          }}
          style={styles.avatar}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingTop: 10,
    // paddingBottom: 15,
  },

  greeting: {
    fontSize: 14,
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
});