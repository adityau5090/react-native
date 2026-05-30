import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useEffect,
  useState,
} from "react";

import {
    deleteFile,
  getFileContent,
  getFilePath,
} from "@/services/fileSystem.service";
import * as Clipboard from "expo-clipboard";
import * as Sharing from "expo-sharing";
import { File, Directory } from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { get } from "react-native/Libraries/NativeComponent/NativeComponentRegistry";

export default function FileDetailsScreen() {
const router = useRouter()
  const {
    folder,
    file,
  } = useLocalSearchParams();

  const [data, setData] = useState<any>(null);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    loadFile();
  }, []);

  const loadFile = () => {
    const result = getFileContent(String(folder), String(file));
    if (
  String(file)
    .toLowerCase()
    .endsWith(".jpg") ||

  String(file)
    .toLowerCase()
    .endsWith(".jpeg") ||

  String(file)
    .toLowerCase()
    .endsWith(".png")
) {
  setIsImage(true);
}
    setData(result);
  };


  const handleCopy = async () => {
  if (!data?.content) return;

  await Clipboard.setStringAsync(
    data.content
  );

  Alert.alert(
    "Copied",
    "Content copied to clipboard"
  );
};

const handleShare = async () => {
  try {
    const uri = getFilePath(
      String(folder),
      String(file)
    );

    await Sharing.shareAsync(uri);
  } catch (error) {
    console.log(error);
  }
};

const handleDelete = () => {
  Alert.alert(
    "Delete File",
    "Are you sure?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const success = deleteFile(String(folder),String(file));

          if (success) {
            router.back();
          }
        },
      },
    ]
  );
};

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>
          File not found
        </Text>
      </View>
    );
  }



  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      <Text style={styles.title}>
        {data.name}
      </Text>

      <Text style={styles.subtitle}>
        Stored in {folder}
      </Text>

      <View style={styles.statsCard}>
        <Text
          style={
            styles.statsNumber
          }
        >
          {
            data.content
              ?.length
          }
        </Text>

        <Text
          style={
            styles.statsText
          }
        >
          Characters
        </Text>
      </View>

      <Text
        style={
          styles.sectionTitle
        }
      >
        Content
      </Text>

      <View
        style={
          styles.codeContainer
        }
      >
        <Text
          style={styles.code}
        >
          {
  isImage ? (
    <Image
      source={{
        uri: getFilePath(
          String(folder),
          String(file)
        ),
      }}
      style={styles.previewImage}
    />
  ) : (
    <View
      style={
        styles.codeContainer
      }
    >
      <Text
        style={styles.code}
      >
        {data.content}
      </Text>
    </View>
  )
}
        </Text>
      </View>

      <View style={styles.actions}>
  <TouchableOpacity
    style={styles.actionButton}
    onPress={handleCopy}
  >
    <Ionicons
      name="copy-outline"
      size={22}
      color="#4E4040"
    />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.actionButton}
    onPress={handleShare}
  >
    <Ionicons
      name="share-outline"
      size={22}
      color="#4E4040"
    />
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.actionButton}
    onPress={handleDelete}
  >
    <Ionicons
      name="trash-outline"
      size={22}
      color="#C98181"
    />
  </TouchableOpacity>
</View>
    </ScrollView>
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
  },

  subtitle: {
    color: "#8B6B6B",
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
  previewImage: {
  width: "100%",
  height: 300,

  borderRadius: 30,

  marginBottom: 20,
},

  sectionTitle: {
    color: "#4E4040",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
  },

  codeContainer: {
    backgroundColor:
      "rgba(255,255,255,0.45)",

    padding: 15,

    borderRadius: 30,

    borderWidth: 1,

    borderColor:
      "rgba(255,255,255,0.35)",

    marginBottom: 20,
  },

  code: {
    color: "#4E4040",
    fontSize: 15,
    lineHeight: 24,
    width: "100%"
  },
  actions: {
  flexDirection: "row",

  justifyContent:
    "space-between",

  marginTop: 20,
},

actionButton: {
  flex: 1,

  marginHorizontal: 6,

  backgroundColor:
    "rgba(255,255,255,0.45)",

  padding: 18,

  borderRadius: 24,

  alignItems: "center",
},

  button: {
    backgroundColor: "#C98181",

    padding: 18,

    borderRadius: 30,

    alignItems: "center",

    marginBottom: 12,
  },

  buttonText: {
    color: "#FFF8F7",
    fontWeight: "700",
  },

  secondaryButton: {
    backgroundColor:
      "rgba(255,255,255,0.45)",

    padding: 18,

    borderRadius: 30,

    alignItems: "center",
  },

  secondaryText: {
    color: "#4E4040",
    fontWeight: "700",
  },
});