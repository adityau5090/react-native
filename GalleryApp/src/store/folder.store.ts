import { create } from "zustand";

interface Folder {
  id: number;
  name: string;
  createdAt: string;
}

interface FolderStore {
  folders: Folder[];

  setFolders: (folders: Folder[]) => void;
}

export const useFolderStore =create<FolderStore>((set) => ({
    folders: [],

    setFolders: (folders) => set({ folders }),
}));