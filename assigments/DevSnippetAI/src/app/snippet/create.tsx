import { createSnippet } from "@/database/snippet.service";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { saveImageLocally, pickImage } from "@/services/image.service";

export default function CreateSnippetScreen() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [imagePath, setImagePath] = useState("")

  const router = useRouter()

  const handleSave = async () => {
    if(!title || !code){
        Alert.alert("Validation","Title & code are required")
        return;
    }

    const success = await createSnippet({title,code, language, tags, imagePath })

    if(success){
        Alert.alert("Success","Snippet saved successfully")

        setTitle("")
        setCode("")
        setTags("")
        setLanguage("")

        router.back();
    }else{
        Alert.alert("Error","Failed to save snippet")
    }

  };

  const handlePickImage = async () => {

    const image = await pickImage();

    if (!image) return;

    const localPath = await saveImageLocally(image.uri);

    if (localPath) {
      setImagePath(localPath);
    }
  };

  

  return (
    <KeyboardAvoidingView 
    style={{flex:1}}
    behavior={
      Platform.OS === "ios" ? "padding" : undefined
    }
    >
    <ScrollView style={styles.container}
    contentContainerStyle={{
    paddingBottom: 120,
    padding: 20
  }}
  keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
  <Text style={styles.heading}>
    Create Snippet
  </Text>

  <Text style={styles.subHeading}>
    Save code, ideas & experiments
  </Text>
</View>

      <TextInput
        placeholder="Title"
        placeholderTextColor="#94a3b8"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <View style={styles.row}>
  <TextInput
    placeholder="Language"
    placeholderTextColor="#8B6B6B"
    value={language}
    onChangeText={setLanguage}
    style={[styles.input, styles.halfInput]}
  />

  <TextInput
    placeholder="Tags"
    placeholderTextColor="#8B6B6B"
    value={tags}
    onChangeText={setTags}
    style={[styles.input, styles.halfInput]}
  />
</View>

<Text style={styles.sectionTitle}>
  &lt;Code /&gt;
</Text>

      <TextInput
        placeholder="Paste your code here..."
        placeholderTextColor="#94a3b8"
        value={code}
        onChangeText={setCode}
        multiline
        textAlignVertical="top"
        style={styles.codeInput}
      />

<Text style={styles.sectionTitle}>
  Screenshot
</Text>
      <TouchableOpacity
  style={styles.secondaryButton}
  onPress={handlePickImage}
>
  <Text style={styles.secondaryButton}>
    Attach Screenshot
  </Text>
</TouchableOpacity>
{
  imagePath ? (
    <View style={styles.imageContainer}>
  <Image
    source={{
      uri: imagePath,
    }}
    style={styles.previewImage}
  />
</View>
  ) : null
}

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Save Snippet
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
    marginBottom: 30,
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

  sectionTitle: {
    color: "#6B4C4C",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 6,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  halfInput: {
    flex: 1,
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

    height: 260,

    marginBottom: 20,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.4)",
  },

  imageContainer: {
    borderRadius: 30,
    overflow: "hidden",
    marginBottom: 20,
  },

  previewImage: {
    width: "100%",
    height: 220,
  },

  secondaryButton: {
    backgroundColor: "#D9B7B7",

    padding: 10,

    borderRadius: 28,

    alignItems: "center",

    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: "#C98181",

    padding: 25,

    borderRadius: 25,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10,

    shadowColor: "#A45F5F",

    shadowOpacity: 1,
    shadowRadius: 12,

    elevation: 6,
  },

  buttonText: {
    color: "#FFF8F7",

    fontSize: 16,

    fontWeight: "700",
  },
});