import { create } from "zustand";

export type THintString<T extends string> = Exclude<string, T> | T;

export type TCollectionMode = "NONE" | "COLLECT_ALL" | "COLLECT_NEW";
export type TPublishMode =
  | "SET_COLLECTED"
  | "MERGE_COLLECTED"
  | "REMOVE_COLLECTED";
export type TStoreType = "COLLECTED_DRAFTS" | "ALL_DRAFTS" | "PUBLISHED";
export type TStrings = { [k: string]: string };

type TStore = {
  isPopulated: boolean;
  publishedStrings: TStrings;

  collectedDraftStrings: TStrings;
  allDraftStrings: TStrings;
  getStrings: () => TStrings;

  storeType1: TStoreType | "NONE";
  storeType2: TStoreType | "NONE";
  storeType3: TStoreType | "NONE";
  setStoreType1: (p: TStoreType | "NONE") => void;
  setStoreType2: (p: TStoreType | "NONE") => void;
  setStoreType3: (p: TStoreType | "NONE") => void;
  getStoreType1: () => TStrings;
  getStoreType2: () => TStrings;
  getStoreType3: () => TStrings;
  getPublishableString: () => TStrings;

  defaultFallbackString: string;
  setDefaultFallbackString: (k: string) => void;

  setCollectionMode: (mode: TCollectionMode) => void;
  collectionMode: TCollectionMode;
  setPublishMode: (mode: TPublishMode) => void;
  publishMode: TPublishMode;

  forceAddDraft: (p: { k: string; v: string }) => void;
  addDraft: (p: { k: string; v: string }) => void;

  populatePublishedStrings: () => void;
  forcePopulateStrings: () => void;
};

export const useStore = create<TStore>((set, get) => {
  return {
    isPopulated: false,
    publishedStrings: {},

    collectedDraftStrings: {},
    allDraftStrings: {},
    getStrings: () => get().publishedStrings,

    storeType1: "NONE",
    storeType2: "NONE",
    storeType3: "NONE",
    setStoreType1: (p) => set({ storeType1: p }),
    setStoreType2: (p) => set({ storeType2: p }),
    setStoreType3: (p) => set({ storeType3: p }),
    getStoreType1: () => {
      const storeType = get().storeType1;
      if (storeType === "ALL_DRAFTS") return get().allDraftStrings;
      if (storeType === "COLLECTED_DRAFTS") return get().collectedDraftStrings;
      if (storeType === "PUBLISHED") return get().publishedStrings;
      return {};
    },
    getStoreType2: () => {
      const storeType = get().storeType2;
      if (storeType === "ALL_DRAFTS") return get().allDraftStrings;
      if (storeType === "COLLECTED_DRAFTS") return get().collectedDraftStrings;
      if (storeType === "PUBLISHED") return get().publishedStrings;
      return {};
    },
    getStoreType3: () => {
      const storeType = get().storeType3;
      if (storeType === "ALL_DRAFTS") return get().allDraftStrings;
      if (storeType === "COLLECTED_DRAFTS") return get().collectedDraftStrings;
      if (storeType === "PUBLISHED") return get().publishedStrings;
      return {};
    },

    getPublishableString: () => {
      return {
        ...get().getStoreType1(),
        ...get().getStoreType2(),
        ...get().getStoreType3(),
      };
    },

    defaultFallbackString: "",
    setDefaultFallbackString: (k) => set(() => ({ defaultFallbackString: k })),

    collectionMode: "NONE",
    setCollectionMode: (collectionMode) => set(() => ({ collectionMode })),
    publishMode: "MERGE_COLLECTED",
    setPublishMode: (publishMode) => set(() => ({ publishMode })),

    forceAddDraft: (p) => {
      set((state) => {
        const drafts = { ...state.collectedDraftStrings, [p.k]: p.v };
        return { collectedDraftStrings: drafts };
      });
    },
    addDraft: (p) => {
      set((state) => {
        const drafts = { ...state.allDraftStrings, [p.k]: p.v };
        return { allDraftStrings: drafts };
      });
      const got = get();
      if (got.collectionMode === "NONE") return;
      if (got.collectionMode === "COLLECT_ALL") return got.forceAddDraft(p);
      if (got.collectionMode === "COLLECT_NEW") {
        const isNewKey = !Object.keys(got.collectedDraftStrings).includes(p.k);
        if (isNewKey) return got.forceAddDraft(p);
      }
    },

    populatePublishedStrings: async () => {
      const got = get();
      got.forcePopulateStrings();
    },
    forcePopulateStrings: async () => {
      const response = await fetch("/api/cms", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(get().collectedDraftStrings),
      });
      const result = await response.json();
      set({
        isPopulated: true,
        publishedStrings: result,
        collectedDraftStrings: { ...get().collectedDraftStrings },
      });
    },
  };
});
