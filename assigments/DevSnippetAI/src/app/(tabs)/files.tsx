import { createFolder, getFolders } from "@/services/FolderSystem.service";
import { createTextFile } from "@/services/fileSystem.service";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import { deleteFolder } from "@/services/FolderSystem.service";

export default function FilesScreen() {
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState<any[]>([]);
  const router = useRouter();

  const handleCreateFolder =
    async () => {
      if (!folderName.trim()) return;

      const success = await createFolder(folderName);

      if (success) {
        Alert.alert(
          "Success",
          "Folder Created"
        );

        setFolderName("");
        loadFolders();
      }
    };

  const loadFolders = () => {
    const data = getFolders();
    setFolders(data);
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const handleDeleteFolder = (folderName: string) => {
    Alert.alert(
      "Delete Folder",
      `Delete ${folderName}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success = deleteFolder(folderName);

            if (success) {
              loadFolders();
            }
          },
        },
      ]
    );
  };

  const createDemoFile =
    async () => {
      const success =
        await createTextFile(
          "MyFolder",
          "useState.txt",
          `
const [count,setCount] =
useState(0)
`
        );

      if (success) {
        Alert.alert(
          "Success",
          "File Created"
        );
      }
    };

  return (
    <FlatList
      data={folders}
      keyExtractor={(item) =>
        item.uri
      }
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={
        false
      }
      ListHeaderComponent={
        <>
          <Text style={styles.title}>
            Files
          </Text>

          <Text
            style={styles.subtitle}
          >
            Organize snippets &
            resources
          </Text>

          <Image
            source={require("@/assets/images/files-banner.png")}
            style={styles.banner}
          />

          <View
            style={styles.statsCard}
          >
            <Text
              style={
                styles.statsNumber
              }
            >
              {folders.length}
            </Text>

            <Text
              style={
                styles.statsText
              }
            >
              Folders Created
            </Text>
          </View>

          <TextInput
            placeholder="Folder name"
            placeholderTextColor="#8B6B6B"
            value={folderName}
            onChangeText={
              setFolderName
            }
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={
              handleCreateFolder
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              📁 Create Folder
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={
              createDemoFile
            }
          >
            <Text
              style={
                styles.buttonText
              }
            >
              📄 Create Demo File
            </Text>
          </TouchableOpacity>

          <Text
            style={
              styles.sectionTitle
            }
          >
            Recent Folders
          </Text>
        </>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          No folders created yet
        </Text>
      }
      renderItem={({ item }) => (
        <View style={styles.folderCard}>
          <TouchableOpacity
            style={styles.folderContent}
            onPress={() =>
              router.push({
                pathname: "/folder/[name]",
                params: { name: item.name },
              })
            }
          >
            <Ionicons
              name="folder"
              size={24}
              color="#C98181"
            />

            <Text style={styles.folderName}>
              {item.name}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              handleDeleteFolder(item.name)
            }
          >
            <Ionicons
              name="trash-outline"
              size={22}
              color="#C98181"
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#4E4040",
    fontSize: 48,
    fontWeight: "300",
  },

  subtitle: {
    color: "#8B6B6B",
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
    marginBottom: 24,
  },

  statsNumber: {
    color: "#4E4040",
    fontSize: 42,
    fontWeight: "300",
  },

  statsText: {
    color: "#6B4C4C",
  },

  sectionTitle: {
    color: "#4E4040",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 16,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.45)",
    color: "#4E4040",
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#C98181",
    padding: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#A45F5F",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },

  buttonText: {
    color: "#FFF8F7",
    fontWeight: "700",
    fontSize: 15,
  },

  folderName: {
    color: "#4E4040",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },

  empty: {
    color: "#8B6B6B",
    textAlign: "center",
    marginTop: 40,
  },
  folderCard: {
    backgroundColor: "rgba(255,255,255,0.45)",
    padding: 20,
    borderRadius: 28,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },

  folderContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});