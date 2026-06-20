import { create } from "zustand";
import { PhotoAsset } from "@/types/photo";

interface GalleryStore {
    photos: PhotoAsset[];
    endCursor:  string | null;
    hasNextPage: boolean; 
    setPhotos: (photos: PhotoAsset[], cursor: string | null, hasNextPage: boolean) => void;
    appendPhotos: (photos: PhotoAsset[], cursor: string | null, hasNextPage: boolean) => void;
    clearPhotos: () => void;
}

export const useGalleryStore = create<GalleryStore>((set) => ({
    photos: [],
    endCursor: null,
    hasNextPage: true,

    setPhotos: (photos,cursor,hasNextPage) => set({photos, endCursor: cursor, hasNextPage}),
    
    appendPhotos: (newPhotos,cursor,hasNextPage) =>
        set((state) => {
            return {
                photos: [
                    ...state.photos,
                    ...newPhotos,
                ],
                endCursor: cursor,
                hasNextPage,
            };
    }),
    
    clearPhotos: () => set({photos: []}),
}))