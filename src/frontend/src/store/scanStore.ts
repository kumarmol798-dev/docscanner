import { create } from "zustand";
import type { PageRotation, ScanPage } from "../types";

interface ScanStore {
  documentName: string;
  pages: ScanPage[];
  setDocumentName: (name: string) => void;
  addPage: (page: ScanPage) => void;
  removePage: (id: string) => void;
  rotatePage: (id: string, rotation: PageRotation) => void;
  reorderPages: (fromIdx: number, toIdx: number) => void;
  clearSession: () => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  documentName: "",
  pages: [],
  setDocumentName: (name) => set({ documentName: name }),
  addPage: (page) => set((state) => ({ pages: [...state.pages, page] })),
  removePage: (id) =>
    set((state) => ({ pages: state.pages.filter((p) => p.id !== id) })),
  rotatePage: (id, rotation) =>
    set((state) => ({
      pages: state.pages.map((p) => (p.id === id ? { ...p, rotation } : p)),
    })),
  reorderPages: (fromIdx, toIdx) =>
    set((state) => {
      const pages = [...state.pages];
      const [moved] = pages.splice(fromIdx, 1);
      pages.splice(toIdx, 0, moved);
      return { pages };
    }),
  clearSession: () => set({ documentName: "", pages: [] }),
}));
