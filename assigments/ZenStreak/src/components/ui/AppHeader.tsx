import {View,Text,Image,StyleSheet, Pressable} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme";
import { useAuthStore } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { useThemeStore } from "@/store/useThemeStore";

export default function AppHeader() {
  const colors = useTheme();

  const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const mode = useThemeStore((state) => state.mode)
  const user = useAuthStore((state) => state.user);

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

        <View style={styles.imageAlign}>
          <Image
          source={{
            uri: user?.avatar,
          }}
          style={styles.avatar}
        />
        <Pressable
              onPress={toggleTheme}
              style={[
                styles.themeButton,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
            >
              <Ionicons
                name={mode === "dark" ? "sunny" : "moon"}
                size={22}
                color={colors.text}
              />
            </Pressable>
        </View>
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
  themeButton: {
    width: 45,
    height: 45,
    borderRadius: 25,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
  },
  imageAlign: {
    flexDirection: "row",
    gap: 18,
    alignItems: "center"
  }
});