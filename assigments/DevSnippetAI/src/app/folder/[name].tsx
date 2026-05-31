import { createTextFile, getFilesInFolder } from "@/services/fileSystem.service";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { pickImage, saveImageLocally } from "../../services/image.service";
import { Ionicons } from "@expo/vector-icons";

export default function FolderScreen() {
  const { name } = useLocalSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [files, setFiles] = useState<any[]>([]);

  const router = useRouter()
  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    const data = getFilesInFolder(String(name));
    setFiles(data);
  };

  const handlePickImage =
  async () => {
    const image = await pickImage();

    if (!image) return;

    const localPath =
      await saveImageLocally(
        image.uri
      );

    if (localPath) {
      setImagePath(localPath);
    }
  };

  const handleCreateFile =
  async () => {

    if (!fileName.trim())
      return;

    await createTextFile(
      String(name),
      fileName,
      fileContent
    );

    setShowModal(false);

    setFileName("");
    setFileContent("");
    setImagePath("");

    loadFiles();
  };
  return (
    <>
    <Stack.Screen 
    options={{
      headerShown: false
    }}
    />
    <View style={styles.container}>
      <Text style={styles.title}>
        {name}
      </Text>

      <TouchableOpacity
  style={styles.createButton}
  onPress={() =>
    setShowModal(true)
  }
>
  <Text style={styles.createText}>
    + Create File
  </Text>
</TouchableOpacity>

      <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }: any) => (
          <TouchableOpacity
          style={styles.fileCard}
  onPress={() =>
    router.push({
      pathname:
        "/file/[folder]/[file]",
      params: {
        folder: String(name),
        file: item.name,
      },
    })

  }
>
  <Text style={styles.fileName}>
    📄 {item.name}
  </Text>

  {item.content ? (
    <View style={styles.previewContainer}>
  <Text
    style={styles.filePreview}
    numberOfLines={4}
  >
    {item.content}
  </Text>
</View>
  ) : null}
</TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text
            style={
              styles.empty
            }
          >
            No files found
          </Text>
        }
      />

      <Modal
  visible={showModal}
  animationType="slide"
  transparent
>
  <View style={styles.modalOverlay}>
    <View style={styles.modal}>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text
        style={styles.modalTitle}
      >
        Create File
      </Text>
      <Pressable onPress={() => setShowModal(false)}>
        <Ionicons name="close" size={30} />
      </Pressable>
      </View>

      <TextInput
        placeholder="File Name"
        value={fileName}
        onChangeText={setFileName}
        style={styles.input}
      />

      <TextInput
        placeholder="Content"
        value={fileContent}
        onChangeText={
          setFileContent
        }
        multiline
        style={
          styles.contentInput
        }
      />

      <TouchableOpacity
        style={
          styles.secondaryButton
        }
        onPress={
          handlePickImage
        }
      >
        <Text>
          Attach Image
        </Text>
      </TouchableOpacity>

      {imagePath ? (
        <Image
          source={{
            uri: imagePath,
          }}
          style={{
            width: "100%",
            height: 150,
            borderRadius: 16,
            marginTop: 10,
          }}
        />
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={
          handleCreateFile
        }
      >
        <Text
          style={
            styles.buttonText
          }
        >
          Create
        </Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </View>
    </>
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
    fontSize: 42,
    fontWeight: "300",
    marginBottom: 6,
  },
  filePreview: {
  color: "#8B6B6B",

  fontSize: 14,

  marginTop: 8,

  lineHeight: 20,
},

  subtitle: {
    color: "#8B6B6B",
    fontSize: 15,
    marginBottom: 20,
  },

  banner: {
    width: "100%",
    height: 180,
    borderRadius: 36,
    marginBottom: 20,
  },

  statsCard: {
    backgroundColor: "#D9B7B7",
    padding: 24,
    borderRadius: 30,
    marginBottom: 20,
  },

  statsNumber: {
    color: "#4E4040",
    fontSize: 42,
    fontWeight: "300",
  },

  statsText: {
    color: "#6B4C4C",
    marginTop: 4,
  },

  createButton: {
    backgroundColor: "#C98181",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,

    shadowColor: "#A45F5F",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },

  createText: {
    color: "#FFF8F7",
    fontWeight: "700",
    fontSize: 16,
  },
  previewContainer: {
  backgroundColor:
    "rgba(255,255,255,0.25)",

  padding: 12,

  borderRadius: 16,

  marginTop: 10,
},

  fileCard: {
    backgroundColor:
      "rgba(255,255,255,0.45)",

    padding: 18,

    borderRadius: 28,

    marginBottom: 12,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.35)",

    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  fileContent: {
    flex: 1,
  },

  fileName: {
    color: "#4E4040",
    fontSize: 18,
    fontWeight: "600",
  },

  fileMeta: {
    color: "#8B6B6B",
    marginTop: 4,
    fontSize: 13,
  },

  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor:
      "rgba(255,255,255,0.35)",

    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    color: "#8B6B6B",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.35)",

    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#EAD8D8",

    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,

    padding: 24,
    paddingBottom: 40,
  },

  modalTitle: {
    color: "#4E4040",
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 20,
  },

  input: {
    backgroundColor:
      "rgba(255,255,255,0.45)",

    color: "#4E4040",

    padding: 18,

    borderRadius: 24,

    marginBottom: 12,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.4)",
  },

  contentInput: {
    backgroundColor:
      "rgba(255,255,255,0.45)",

    color: "#4E4040",

    minHeight: 140,

    padding: 18,

    borderRadius: 24,

    textAlignVertical: "top",

    marginBottom: 14,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.4)",
  },

  secondaryButton: {
    backgroundColor: "#D9B7B7",

    padding: 18,

    borderRadius: 28,

    alignItems: "center",

    marginBottom: 14,
  },

  button: {
    backgroundColor: "#C98181",

    padding: 18,

    borderRadius: 30,

    alignItems: "center",

    marginTop: 12,

    shadowColor: "#A45F5F",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },

  buttonText: {
    color: "#FFF8F7",
    fontWeight: "700",
    fontSize: 16,
  },

  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 24,
    marginBottom: 14,
  },
});