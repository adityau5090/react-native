import * as MediaLibrary from "expo-media-library"

export async function requestGalleryPermission(){
    const result = await MediaLibrary.requestPermissionsAsync();
    // console.log(result)
    return {
        granted: result.granted,
        canAskAgain: result.canAskAgain
    }
}

export async function getPhotos(first:number = 50, after?: string){
    const photos = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
        first,
        after,
        sortBy: [MediaLibrary.SortBy.creationTime]
    })

    return photos;
}