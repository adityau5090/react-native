import { useEffect, useState, useRef } from "react";
import { View,Text,Image,BackHandler, Button, Linking } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { LoadingView } from "@/components/ui/LoadingView";
import { requestGalleryPermission,getPhotos } from "@/services/media.service";
import { MasonryGallery } from "@/components/gallery/MasonryGallery";
import { useGalleryStore } from "@/store/gallery.store";
import MasonrySkeleton from "@/components/gallery/MasonrySkeleton";
import { useSelectionStore } from "@/store/selection.store";
import { SelectionBar } from "@/components/gallery/SelectionBar";
import { heavyImpact } from "@/services/haptics.service"

export default function GalleryScreen() {
  const colors = useTheme();

  const [loading, setLoading] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [canAskAgain, setCanAskAgain] = useState<boolean>(true)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  const {photos, endCursor, hasNextPage, setPhotos, appendPhotos} = useGalleryStore()

  const { isSelectionMode, selectedIds, clearSelection } = useSelectionStore();

  const  paginationLock = useRef(false);
  useEffect(() => {
    loadPhotos();
  }, []);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (isSelectionMode) {
        heavyImpact()
        clearSelection();
        return true;
      }

      return false;
    });

    return () => subscription.remove();
  }, [isSelectionMode]);

  const loadPhotos = async () => {
    const permission = await requestGalleryPermission();
    setPermissionGranted(permission.granted)
    setCanAskAgain(permission.canAskAgain)

    if (!permission.granted) {
      setLoading(false);
      return;
    }

    const result = await getPhotos(50);
    setPhotos(result.assets, result.endCursor, result.hasNextPage);
    setLoading(false);
  }

  const loadMore = async () => {
    console.log("Load mor called ", Date.now())
    if (paginationLock.current) return; 
    console.log("Loading more photos...")
    console.log("Current Photo : ", photos.length)
    
    if(!hasNextPage) return;

    paginationLock.current = true
    setLoadingMore(true)
    try{
      const result = await getPhotos(50, endCursor || undefined);
      console.log("New Photo : ", result.assets.length)

      const existingIds = new Set(photos.map(photo => photo.id));

      const uniqueNewPhotos = result.assets.filter(photo => !existingIds.has(photo.id));
      console.log("Unique New Photos: ", uniqueNewPhotos.length)

      appendPhotos(uniqueNewPhotos, result.endCursor, result.hasNextPage)

    } catch (error) {
      console.error("Error loading more photos: ", error)
    }finally {  
      setLoadingMore(false)

      setTimeout(() => {
        paginationLock.current = false
      }, 500)
    }  

  }

  if (loading) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <MasonrySkeleton />
    </View>
  );
}



  if(!permissionGranted){
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center", gap: 15, backgroundColor: colors.background}}>
        <Text style={{color: colors.text}}>We need permission to access your photos</Text>
        {canAskAgain ? (
          <Button title="Grant Permission" color={colors.primary} onPress={loadPhotos} />
        ) : (
          <>
          <Text style={{color: colors.text}}>Permission permanentally denied enable it from setting</Text>
          <Button title="Enable Permission" color={colors.primary} onPress={() => Linking.openSettings()} />
          </>
        )}
       
      </View>
    )
  }

  return (
    <View
      style={{flex: 1, backgroundColor: colors.background}}
    >
      {selectedIds.length > 0  && <SelectionBar />}
      <MasonryGallery photos={photos} onLoadMore={loadMore} loadingMore={loadingMore} />
    </View>
  );
}