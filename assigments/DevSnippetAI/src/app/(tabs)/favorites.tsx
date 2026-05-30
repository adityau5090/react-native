import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  useFocusEffect,
  router,
} from "expo-router";

import {
  useCallback,
  useState,
} from "react";

import {
  getFavorites,
} from "@/database/snippet.service";


export default function FavoritesScreen() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [loader, setLoader] = useState(true)
  const [error, setError] = useState("")

  const loadData = async () => {
    setError("")
    try {
        const data = await getFavorites();
        // console.log("data : ",data)
        setSnippets(data);
    } catch (error : any) {
        setError(error.message || "Something went wrong")
    }finally{
        setLoader(false)
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

    if(loader){
      return (
          <View style={styles.container}>
              <Text style={styles.text}>Loading....</Text>
          </View>
      )
    }
    if(error){
      return (
          <View style={styles.container}>
              <Text style={styles.text}>Failed to fetch favorites</Text>
          </View>
      )
    }
  
    if (snippets.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You did't mark any snippet as favorite</Text>
      </View>
    );
}

  return (
    <View style={styles.container}>
      <FlatList
      ListHeaderComponent={
<>
  <Text style={styles.title}>
    Favorites
  </Text>

  <Text style={styles.subtitle}>
    Your most loved snippets
  </Text>

  <Image
    source={require("@/assets/images/favorites-banner.png")}
    style={styles.banner}
  />

  <View style={styles.countCard}>
    <Text style={styles.countNumber}>
      {snippets.length}
    </Text>

    <Text style={styles.countText}>
      Saved Favorites
    </Text>
  </View>

  <Text style={styles.sectionTitle}>
    Recent Favorites
  </Text>
</>
}
        data={snippets}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
                  <TouchableOpacity style={styles.card}
                  onPress={() => router.push(`/snippet/${item.id}`)}
                   >
                    <Text style={styles.cardTitle}>
                      {item.title}
                    </Text>
        
                    <Text style={styles.language}>
                      {item.language}
                    </Text>
                  </TouchableOpacity>
                )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8D8",
    padding: 16,
  },

  item: {
    color: "white",
    backgroundColor: "#0f172a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  text: {
    color: 'white'
  },
    card: {
  backgroundColor: "rgba(255,255,255,0.4)",
  padding: 22,
  borderRadius: 30,
  marginBottom: 16,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.45)",
},
banner: {
    width: "100%",
    height: 180,
    borderRadius: 36,
    marginBottom: 24,
  },
title: {
  color: "#4E4040",
  fontSize: 42,
  fontWeight: "300",
},
sectionTitle: {
    color: "#5C4B4B",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },

subtitle: {
  color: "#8B6B6B",
  marginBottom: 24,
},
countCard: {
  backgroundColor: "#daaaaa",

  padding: 24,

  borderRadius: 30,

  marginBottom: 24,
},
countNumber: {
  color: "#4E4040",

  fontSize: 40,

  fontWeight: "300",
},
countText: {
  color: "#6B4C4C",
},
  cardTitle: {
  color: "#4E4040",

  fontSize: 20,

  fontWeight: "700",
},
  language: {
  color: "#8B6B6B",

  marginTop: 8,
},
});