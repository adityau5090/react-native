import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { getSnippets, searchSnippets } from "../../database/snippet.service";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();

  const [snippets, setSnippets] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const inset = useSafeAreaInsets()
  const loadSnippets = async () => {
    const data = await getSnippets();
    setSnippets(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadSnippets();
    }, [])
  );

  const handleSearch = async (value: string) => {
    setSearch(value);

    if (!value.trim()) {
      loadSnippets();
      return;
    }

    const data = await searchSnippets(value);
    setSnippets(data);
  };

  return (
    <View style={[styles.container, { marginBottom: inset.bottom }]}>
      <View style={styles.topSection}>
        <View style={styles.header}>
              <View>
                <Text style={styles.title}>
                  DevSnippets
                </Text>

                <Text style={styles.subtitle}>
                  Save • Learn • Reuse
                </Text>
              </View>

              <TouchableOpacity
                style={styles.settingsButton}
                onPress={() =>
                  router.push("/settings")
                }
              >
                <Text
                  style={{
                    fontSize: 20,
                  }}
                >
                  ⚙️
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={require("@/assets/images/home-banner.png")}
              style={styles.banner}
              resizeMode="cover"
            />

            <TextInput
              placeholder="Search snippets..."
              placeholderTextColor="#8A7373"
              value={search}
              onChangeText={handleSearch}
              style={styles.searchInput}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                router.push(
                  "/snippet/create"
                )
              }
            >
              <Text
                style={
                  styles.buttonText
                }
              >
                + Create Snippet
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>
              Recent Snippets
            </Text>
      </View>
      <View style={styles.listContainer}>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={snippets}
        keyExtractor={(item) =>
          item.id.toString()
        }
        contentContainerStyle={{
        paddingBottom: 100,
      }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No snippets found
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(
                `/snippet/${item.id}`
              )
            }
          >
            <Text
              style={
                styles.cardTitle
              }
            >
              {item.title}
            </Text>

            <Text
              style={
                styles.language
              }
            >
              {item.language}
            </Text>
          </TouchableOpacity>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8D8",
    paddingHorizontal: 10,
    // paddingTop: 20,
  },
  topSection: {
  flexShrink: 0,
},

  title: {
    color: "#5C4B4B",
    fontSize: 44,
    fontWeight: "300",
    letterSpacing: -1,
  },

  subtitle: {
    color: "#8A7373",
    fontSize: 16,
    marginTop: 3,
    marginBottom: 24,
  },

  banner: {
    width: "100%",
    height: 180,
    borderRadius: 36,
    marginBottom: 14,
  },

  searchInput: {
    backgroundColor: "rgba(255,255,255,0.55)",
    color: "#4E4040",
    padding: 18,
    borderRadius: 24,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
  },

  button: {
    backgroundColor: "#C98181",
    padding: 15,
    borderRadius: 30,
    marginBottom: 10,
    shadowColor: "#A45F5F",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },

  buttonText: {
    color: "#FFF8F7",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#5C4B4B",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  listContainer: {
  flex: 1,
},

  card: {
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 20,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    shadowColor: "#A45F5F",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  cardTitle: {
    color: "#4E4040",

    fontSize: 20,

    fontWeight: "700",
  },

  language: {
    color: "#8B6B6B",

    marginTop: 6,
  },
  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 20,
  },
  settingsButton: {
    width: 52,

    height: 52,

    borderRadius: 26,

    backgroundColor:
      "rgba(255,255,255,0.4)",

    justifyContent: "center",

    alignItems: "center",
  },

  empty: {
    color: "#8A7373",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});