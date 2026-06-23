  import { View, Text, FlatList, Pressable } from "react-native";
  import { useEffect, useState } from "react";
  import { getFolders, createFolder } from "@/services/folder.service";
  import { useFolderStore, } from "@/store/folder.store";
  import { Modal, TextInput } from "react-native";
  import { BlurView } from "expo-blur";
  import { useTheme } from "@/hooks/useTheme";

  export default function FoldersScreen() {
    const colors = useTheme();
    const { folders, setFolders } = useFolderStore();

    const [modalVisible, setModalVisible] = useState(false);
    const [folderName, setFolderName] = useState("");

    useEffect(() => {
      setFolders(
        getFolders() as any
      );
    }, []);

    const handleCreateFolder = () => {
      if (!folderName.trim()) return;

    try {
      createFolder(folderName.trim());

      setFolders(getFolders() as any);

      setFolderName("");
      setModalVisible(false);
    } catch (error) {
      console.log("Folder already exists", error);
    }
    };

    return (
      <View style={{flex: 1,paddingTop: 70,paddingHorizontal: 20}}>
        <Text
          style={{fontSize: 34,fontWeight: "800"}}
        >
          Folders
        </Text>

         <FlatList
          data={folders}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item) =>
            item.id.toString()
          }

          renderItem={({ item }) => (
            <View
              style={{
                height: 90,
                borderRadius: 24,

                justifyContent:
                  "center",

                paddingHorizontal: 20,

                marginTop: 16,

                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        />

        <Pressable
          onPress={() => {
            console.log("FAB pressed")
            setModalVisible(true)}
          }
          style={{
            position: "absolute",

            right: 24,
            bottom: 110,

            width: 65,
            height: 65,

            borderRadius: 32.5,

            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "#B83232",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.25,
            shadowRadius: 12,

            elevation: 8,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 34,
              fontWeight: "300",
            }}
          >
            +
          </Text>
        </Pressable>

       

        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
        >
          <View
            style={{
              flex: 1,

              justifyContent: "center",
              alignItems: "center",

              backgroundColor:
                "rgba(0,0,0,0.5)",
            }}
          >
            <BlurView
              intensity={40}
              tint="dark"
              style={{
                width: "88%",

                borderRadius: 30,

                padding: 24,

                overflow: "hidden",

                backgroundColor: "rgba(255, 255, 255, 0.57)",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.07)",
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontSize: 24,
                  fontWeight: "700",

                  marginBottom: 20,
                }}
              >
                Create Folder
              </Text>

              <TextInput
                placeholder="Folder Name"
                placeholderTextColor="#ffffffb5"
                value={folderName}
                onChangeText={setFolderName}
                style={{
                  height: 55,

                  borderRadius: 18,

                  paddingHorizontal: 18,

                  color: "#fff",

                  backgroundColor: "rgba(255, 255, 255, 0.26)",
                }}
              />

              <View
                style={{
                  flexDirection: "row",

                  justifyContent:
                    "flex-end",

                  gap: 14,

                  marginTop: 24,
                }}
              >
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                    setFolderName("");
                  }}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontSize: 16,
                    }}
                  >
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  onPress={handleCreateFolder}
                >
                  <Text
                    style={{
                      color: "#B83232",
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    Create
                  </Text>
                </Pressable>
              </View>
            </BlurView>
          </View>
        </Modal>
      </View>
    );
  }