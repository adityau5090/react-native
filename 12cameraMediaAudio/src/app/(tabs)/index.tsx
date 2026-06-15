import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [permission, requestPermission] = MediaLibrary.usePermissions();

  const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<MediaLibrary.Album | null>(null);
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState(true);

  const loadAlbums = async () => {
    try {
      const list = await MediaLibrary.getAlbumsAsync({includeSmartAlbums: true,});
      setAlbums(list);
    } catch (error) {
      console.log("Error loading albums:", error);
    }
  };

  const loadAssets = async (album: MediaLibrary.Album | null,reset = true) => {
    if (!reset && (!hasNextPage || loadingMore)) {
      return;
    }

    if (reset) {
      setLoading(true);
      setAssets([]);
      setNextCursor(undefined);
      setHasNextPage(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const result = await MediaLibrary.getAssetsAsync({
        first: 50,
        after: reset ? undefined : nextCursor,
        album: album ?? undefined,
        mediaType: MediaLibrary.MediaType.photo,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });

      setAssets((prev) =>
        reset ? result.assets : [...prev, ...result.assets]
      );
      setNextCursor(result.endCursor);
      setHasNextPage(result.hasNextPage);
    } catch (error) {
      console.log("Error loading assets:", error);
    } finally {
      if (reset) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  const selectAlbum = (album: MediaLibrary.Album | null) => {
    setSelectedAlbum(album);
    loadAssets(album, true);
  };

  useEffect(() => {
    if (permission?.granted) {
      loadAlbums();
      loadAssets(null, true);
    }
  }, [permission?.granted]);

  if (!permission) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!permission.granted) {
    const deniedPermanently = !permission.canAskAgain;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
          gap: 12,
        }}
      >
        <Text>
          We need access to your gallery to display photos and albums.
        </Text>

        {deniedPermanently ? (
          <>
            <Text>
              Permission has been permanently denied. Enable it from Settings.
            </Text>

            <Button
              title="Open Settings"
              onPress={() => Linking.openSettings()}
            />
          </>
        ) : (
          <Button
            title="Grant Permission"
            onPress={() => requestPermission()}
          />
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingVertical: 10 }}>
        <Text style={{ paddingHorizontal: 12, marginBottom: 10 }}>
          {assets.length} photos •{" "}
          {selectedAlbum ? selectedAlbum.title : "Recent"}
        </Text>

        {/* Album Selector */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            {
              id: "recent",
              title: "Recent",
            } as any,
            ...albums,
          ]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 12,
            gap: 8,
          }}
          renderItem={({ item }) => {
            const isRecent = item.id === "recent";

            const selected = isRecent
              ? selectedAlbum === null
              : selectedAlbum?.id === item.id;

            return (
              <Pressable
                onPress={() =>
                  selectAlbum(
                    isRecent ? null : (item as MediaLibrary.Album)
                  )
                }
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: selected ? "#333" : "#e5e5e5",
                }}
              >
                <Text
                  style={{
                    color: selected ? "#fff" : "#000",
                  }}
                >
                  {item.title}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={assets}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={{ gap: 2 }}
          contentContainerStyle={{ gap: 2 }}
          onEndReached={() => loadAssets(selectedAlbum, false)}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={{ marginVertical: 16 }} />
            ) : null
          }
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.uri }}
              style={{
                flex: 1,
                aspectRatio: 1,
              }}
              contentFit="cover"
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}