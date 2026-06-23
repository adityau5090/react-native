import { useMasonry } from "@/hooks/useMasonry"
import { ScrollView, Text, View } from "react-native"
import PhotoCard from "./PhotoCard"
import { getMasonryHeight } from "@/utils/masonry"
import { useTheme } from "@/hooks/useTheme"
import { PhotoAsset } from "@/types/photo"
import  { GalleryLoader } from "./GalleryLoader"
import { useSelectionStore } from "@/store/selection.store"
import { mediumImpact, selectionHaptic } from "@/services/haptics.service"
import { router } from "expo-router"
import { usePhotoViewerStore } from "@/store/photoViewer.store"

interface Props{
    photos: PhotoAsset[],
    onLoadMore?: () => void,
    loadingMore?: boolean,
}

const MasonryGallery = ({photos, onLoadMore, loadingMore}: Props) => {
    const colors = useTheme()
    const { left, right } = useMasonry(photos)
    const { setCurrentPhoto } = usePhotoViewerStore()

    const {selectedIds, isSelectionMode, toggleSelection, enterSelectionMode} = useSelectionStore();

    const allIds = photos.map((p) => p.id);
    const duplicates = allIds.filter(
        (id, index) => allIds.indexOf(id) !== index
    );

    if(duplicates.length > 0) {
        console.warn("RENDER DUPLICATES:", duplicates);
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
            onMomentumScrollEnd={(event) => {
                const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent

                const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 500

                if(isNearBottom && !loadingMore){
                    onLoadMore?.()
                }
            }}
            scrollEventThrottle={16}
        >
            {!isSelectionMode && (
                <View
                style={{
                    paddingHorizontal: 20,
                    paddingTop: 60,
                    paddingBottom: 20,
                }}
                >
                <Text
                    style={{
                    color: colors.text,
                    fontSize: 32,
                    fontWeight: "800",
                    }}
                >
                    Memories
                </Text>

                <Text
                    style={{
                    color: colors.subText,
                    marginTop: 4,
                    }}
                >
                    {photos.length} Photos
                </Text>
            </View>
            )}
            
            <View style={{flexDirection: "row", gap: 10, paddingHorizontal: 10}}>
                <View style={{flex: 1, gap: 10}}>
                    {left.map((photo) => (
                        <PhotoCard
                            key={photo.id}
                            id={photo.id}
                            uri={photo.uri}
                            height={getMasonryHeight(photo.width, photo.height)}
                            selected={selectedIds.includes(photo.id)}
                            onPress={async () => {
                                if(isSelectionMode){
                                    await selectionHaptic();
                                    toggleSelection(photo.id)
                                    return;
                                }

                                setCurrentPhoto(photo);
                                router.push({
                                    pathname: "/photo/[id]",
                                    params: { id: photo.id }
                                })
                            }}
                            onLongPress={async () => {
                                await mediumImpact()
                                enterSelectionMode(photo.id)
                            }}
                        />
                    ))}
                </View>
                <View style={{flex: 1, gap: 10}}>
                    {right.map((photo) => (
                        <PhotoCard
                            key={photo.id}
                            id={photo.id}
                            uri={photo.uri}
                            height={getMasonryHeight(photo.width, photo.height)}
                            selected={selectedIds.includes(photo.id)}
                            onPress={async () => {
                                if(isSelectionMode){
                                    await selectionHaptic();
                                    toggleSelection(photo.id)
                                    return;
                                }

                                setCurrentPhoto(photo);
                                router.push({
                                    pathname: "/photo/[id]",
                                    params: { id: photo.id }
                                })
                            }}
                            onLongPress={async () => {
                                await mediumImpact()    
                                enterSelectionMode(photo.id)
                            }}
                        />
                    ))}
                </View>
            </View>

            {loadingMore && <GalleryLoader />}

        </ScrollView>    
    )
}

export { MasonryGallery }