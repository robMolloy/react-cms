import { create } from "zustand";

export type THintString<T extends string> = Exclude<string, T> | T;

export type TCollectionMode = "NONE" | "COLLECT_ALL" | "COLLECT_NEW";
export type TPublishMode =
  | "SET_COLLECTED"
  | "MERGE_COLLECTED"
  | "REMOVE_COLLECTED";
export type TPrePublishBaseOption = "PUBLISHED";
export type TPrePublishAdditionOption = "COLLECTED_DRAFTS" | "ALL_DRAFTS";
export type TStrings = { [k: string]: string };

type TStore = {
  isPopulated: boolean;
  publishedStrings: TStrings;

  collectedDraftStrings: TStrings;
  allDraftStrings: TStrings;
  getStrings: () => TStrings;

  prePublishBaseOption: TPrePublishBaseOption | "NONE";
  prePublishAdditionsOption: TPrePublishAdditionOption | "NONE";
  setPrePublishBaseOption: (p: TPrePublishBaseOption | "NONE") => void;
  setPrePublishAdditionsOption: (p: TPrePublishAdditionOption | "NONE") => void;
  getPrePublishBase: () => TStrings;
  getPrePublishAdditions: () => TStrings;
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

    prePublishBaseOption: "NONE",
    prePublishAdditionsOption: "NONE",
    setPrePublishBaseOption: (p) => set({ prePublishBaseOption: p }),
    setPrePublishAdditionsOption: (p) => set({ prePublishAdditionsOption: p }),
    getPrePublishBase: () => {
      const storeType = get().prePublishBaseOption;
      if (storeType === "PUBLISHED") return get().publishedStrings;
      return {};
    },
    getPrePublishAdditions: () => {
      const storeType = get().prePublishAdditionsOption;
      if (storeType === "ALL_DRAFTS") return get().allDraftStrings;
      if (storeType === "COLLECTED_DRAFTS") return get().collectedDraftStrings;
      return {};
    },

    getPublishableString: () => {
      return {
        ...get().getPrePublishBase(),
        ...get().getPrePublishAdditions(),
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
