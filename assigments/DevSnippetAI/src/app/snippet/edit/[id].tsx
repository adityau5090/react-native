import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { getSnippetById, updateSnippet } from "@/database/snippet.service";

export default function EditSnippetScreen() {
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    loadSnippet();
  }, []);

  const loadSnippet = async () => {
    const snippet = (await getSnippetById(Number(id))) as any;

    if (snippet) {
      setTitle(snippet.title ?? "");
      setLanguage(snippet.language ?? "");
      setTags(snippet.tags ?? "");
      setCode(snippet.code ?? "");
    }
  };

  const handleUpdate =
    async () => {
      const success =
        await updateSnippet(
          Number(id),
          title,
          code,
          language,
          tags
        );

      if (success) {
        Alert.alert(
          "Success",
          "Snippet Updated"
        );

        router.back();
      }
    };

  return (
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={
    Platform.OS === "ios"
      ? "padding"
      : undefined
  }
>
  <ScrollView
    style={styles.container}
    contentContainerStyle={{
      padding: 20,
      paddingBottom: 120,
    }}
  >
      <View style={styles.header}>
  <Text style={styles.heading}>
    Edit Snippet
  </Text>

  <Text style={styles.subHeading}>
    Refine and improve your code
  </Text>
</View>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <View style={styles.row}>
  <TextInput
    style={[
      styles.input,
      styles.halfInput,
    ]}
    value={language}
    onChangeText={setLanguage}
    placeholder="Language"
    placeholderTextColor="#8B6B6B"
  />

  <TextInput
    style={[
      styles.input,
      styles.halfInput,
    ]}
    value={tags}
    onChangeText={setTags}
    placeholder="Tags"
    placeholderTextColor="#8B6B6B"
  />
</View>
    <Text style={styles.sectionTitle}>
  &lt;Code /&gt;
</Text>
      <TextInput
        style={styles.codeInput}
        value={code}
        onChangeText={setCode}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={
          handleUpdate
        }
      >
        <Text
          style={
            styles.buttonText
          }
        >
          ✨ Save Changes
        </Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAD8D8",
  },

  header: {
    marginBottom: 28,
  },

  heading: {
    color: "#4E4040",
    fontSize: 42,
    fontWeight: "300",
  },

  subHeading: {
    color: "#8B6B6B",
    marginTop: 6,
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  sectionTitle: {
    color: "#6B4C4C",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 6,
  },

  input: {
    backgroundColor:
      "rgba(255,255,255,0.45)",

    color: "#4E4040",

    padding: 18,

    borderRadius: 24,

    marginBottom: 14,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.4)",
  },

  codeInput: {
    backgroundColor:
      "rgba(255,255,255,0.35)",

    color: "#4E4040",

    padding: 20,

    borderRadius: 30,

    minHeight: 260,

    textAlignVertical: "top",

    marginBottom: 24,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.4)",
  },

  button: {
    backgroundColor: "#C98181",

    padding: 18,

    borderRadius: 30,

    alignItems: "center",

    shadowColor: "#A45F5F",

    shadowOpacity: 0.2,

    shadowRadius: 12,

    elevation: 4,
  },

  buttonText: {
    color: "#FFF8F7",

    fontSize: 16,

    fontWeight: "700",
  },
});