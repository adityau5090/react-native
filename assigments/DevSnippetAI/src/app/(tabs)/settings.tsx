import { useEffect, useState } from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,Image} from "react-native";
import {saveValue,getValue,KEYS} from "@/services/secure-store.service";
import { useRouter } from "expo-router";
import { getTotalFavorites, getTotalSnippets } from "@/database/snippet.service";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [provider, setProvider] = useState("openai");
  const [openAIKey, setOpenAIKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [stats, setStats] = useState({ snippets: 0, favorites: 0 });

  const inset = useSafeAreaInsets()
  const router = useRouter()
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedProvider = await getValue(KEYS.PROVIDER);
    const savedOpenAI = await getValue(KEYS.OPENAI);
    const savedGemini = await getValue(KEYS.GEMINI);

    if (savedProvider) {
      setProvider(savedProvider);
    }

    if (savedOpenAI) {
      setOpenAIKey(savedOpenAI);
    }

    if (savedGemini) {
      setGeminiKey(savedGemini);
    }
  };

  const handleSave = async () => {
    await saveValue(
      KEYS.PROVIDER,
      provider
    );

    if (provider === "openai") {
      await saveValue(
        KEYS.OPENAI,
        openAIKey
      );
    }

    if (provider === "gemini") {
      await saveValue(
        KEYS.GEMINI,
        geminiKey
      );
    }
    Alert.alert(
      "Success",
      "Settings Saved"
    );
    router.back()
  };

  const loadStats = async () => {
    const snippets = await getTotalSnippets();
    const favorites = await getTotalFavorites();
    setStats({ snippets, favorites, });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const StatCard = ({ title, value }: any) => (
    <View style={[styles.card, {paddingTop: inset.top, paddingBottom: inset.bottom}]} >
      <Text style={styles.value}>
        {value}
      </Text>

      <Text style={styles.label}>
        {title}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Image
        source={require("@/assets/images/setting-banner.png")}
        style={styles.banner}
      />
      <View style={styles.grid}>
        <StatCard
          title="Snippets"
          value={stats.snippets}
        />

        <StatCard
          title="Favorites"
          value={stats.favorites}
        />
      </View>
      <Text style={styles.title}>
        AI Settings
      </Text>

      <Text style={styles.label}>
        Provider
      </Text>

      <View style={styles.providerRow}>
        <TouchableOpacity
          style={[
            styles.providerButton,
            provider === "openai" &&
            styles.activeProvider,
          ]}
          onPress={() =>
            setProvider("openai")
          }
        >
          <Text
            style={styles.providerText}
          >
            OpenAI
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.providerButton,
            provider === "gemini" &&
            styles.activeProvider,
          ]}
          onPress={() =>
            setProvider("gemini")
          }
        >
          <Text
            style={styles.providerText}
          >
            Gemini
          </Text>
        </TouchableOpacity>
      </View>

      {provider === "openai" ? (
        <>
          <Text style={styles.label}>
            OpenAI API Key
          </Text>

          <TextInput
            value={openAIKey}
            onChangeText={setOpenAIKey}
            placeholder="sk-proj-..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            secureTextEntry
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>
            Gemini API Key
          </Text>

          <TextInput
            value={geminiKey}
            onChangeText={setGeminiKey}
            placeholder="AIza..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            secureTextEntry
          />
        </>
      )}
      <Text style={styles.helperText}>
        {provider === "openai"
          ? "Paste your OpenAI API key."
          : "Paste your Gemini API key."}
      </Text>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          Save Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8D8",
    padding: 20,
  },
  title: {
    color: "#4E4040",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 15
  },
  banner: {
    width: "100%",
    height: 180,
    borderRadius: 36,
    marginBottom: 24,
  },


  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  card: {
    flex: 1,

    backgroundColor:
      "rgba(255,255,255,0.4)",

    padding: 24,

    borderRadius: 30,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.45)",
  },

  value: {
    color: "#4E4040",
    fontSize: 36,
    fontWeight: "300",
  },

  label: {
    color: "#8B6B6B",
    marginTop: 8,
  },
  input: {
    backgroundColor:
      "rgba(255,255,255,0.45)",

    color: "#4E4040",

    padding: 18,

    borderRadius: 24,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.4)",
  },
  providerRow: {
    flexDirection: "row",
    gap: 10,
  },

  providerButton: {
    flex: 1,
    padding: 18,

    backgroundColor:
      "rgba(255,255,255,0.4)",

    borderRadius: 24,

    alignItems: "center",
  },

  activeProvider: {
    backgroundColor: "#C98181",
  },

  providerText: {
    color: "#4E4040",
    fontWeight: "700",
  },
  helperText: {
    color: "#8B6B6B",

    marginTop: 10,

    fontSize: 14,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#C98181",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#A45F5F",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  saveText: {
    color: "#FFF8F7",

    fontWeight: "700",

    fontSize: 16,
  },
});