import { Text, View, StyleSheet, Linking, Button, ActivityIndicator, FlatList } from "react-native";
import * as MediaLibrary from "expo-media-library"
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";


export default function Index() {
  const [permission, requestPermission] = MediaLibrary.usePermissions()
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([])
  const [loading, setLoading] = useState(false)

  const loadGallery = async () => {
    if(!permission){
    return <Text>Chexking for Premissions</Text>
  }

  if(!permission?.granted){
    const deniedPermanently = !permission?.canAskAgain

    return (
      <View style={{flex: 1, justifyContent: "center", gap: 5, padding: 20}}>
        <Text>
          We need to access your gallery to show photos and videos
        </Text>

        {deniedPermanently ? (
          <>
          <Text>Access was denied Enable it in settings</Text>
          <Button title="Open Settings" onPress={() => Linking.openSettings()} />
        </>): ( <>
            <Button title="Grant access" onPress={requestPermission} />
         </>
        )}

      </View>
    )
  }

  setLoading(true)
  try {
    const page = await MediaLibrary.getAssetsAsync({
      first: 20,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: [[MediaLibrary.SortBy.creationTime, false]]
    })
    setAssets(page.assets)
  } catch (error) {
      console.log("Error  in fetching photos:", error)
  }finally{
    setLoading(false)
  }

  }
  
  useEffect(() => {
    if(permission?.granted){
      loadGallery()
    }
  }, [permission?.granted])
  
  if(!permission){
    return <ActivityIndicator style={{ flex: 1}} />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ marginBottom: 8}}>
          {assets.length} photos . access : {permission.accessPrivileges}
        </Text>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
          data={assets}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{ gap: 2}}
          contentContainerStyle={{ gap: 2}}
          renderItem={({item}) => (
            <Image
            source={{ uri: item.uri}}
            style={{ flex: 1, aspectRatio: 1, borderRadius: 4}}
            contentFit="cover"
            />
          )}
          />
        )
      }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color: "tomato",
  },
  text: {
    color: "tomato"
  }
});
