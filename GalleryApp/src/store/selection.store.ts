import {create} from "zustand";

interface SelectionStore {
    selectedIds: string[];

    isSelectionMode: boolean;
    
    toggleSelection: (id: string) => void;

    enterSelectionMode: (id: string) => void;

    clearSelection: () => void;
}

const useSelectionStore = create<SelectionStore>((set) => ({
    selectedIds: [],
    isSelectionMode: false,

    toggleSelection: (id) => set((state) => {
        const exists = state.selectedIds.includes(id);

        return {
            selectedIds: exists ? state.selectedIds.filter((item) => item !== id) : [...state.selectedIds, id]
        }
    }),

    enterSelectionMode: (id: string) => set({isSelectionMode: true, selectedIds: [id]}),

    clearSelection: () => set({isSelectionMode: false, selectedIds: []}),

}))

export { useSelectionStore }