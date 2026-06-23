import { create } from "zustand";
import { PhotoAsset } from "@/types/photo";

interface PhotoViewerStore {
    currentPhoto: PhotoAsset | null;
    setCurrentPhoto: (photo: PhotoAsset) => void;
    clearCurrentPhoto: () => void;
}

const usePhotoViewerStore = create<PhotoViewerStore>((set) => ({
    currentPhoto: null,
    setCurrentPhoto: (photo) => set({currentPhoto: photo}),
    clearCurrentPhoto: () => set({currentPhoto: null}),
}))

export { usePhotoViewerStore }