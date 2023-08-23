import { create, StoreApi, UseBoundStore } from "zustand";

export type THintString<T extends string> = Exclude<string, T> | T;

export type TCollectionMode = "ON" | "OFF";
export type TPublishMode = "MERGE_ADDITIONS" | "REMOVE_ADDITIONS";
export type TPrePublishBaseOption = "PUBLISHED";
export type TPrePublishAdditionOption =
  | "COLLECTED_RENDERED_DRAFTS"
  | "ALL_RENDERED_DRAFTS";
export type TStrings = { [k: string]: string };

type TStore = {
  isPopulated: boolean;
  publishedStrings: TStrings;

  collectedRenderedStrings: TStrings;
  allRenderedStrings: TStrings;
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

type TCreateReactCmsStore = (p1?: {
  defaultValue?: string;
}) => UseBoundStore<StoreApi<TStore>>;
const createReactCmsStore: TCreateReactCmsStore = () => {
  return create<TStore>((set, get) => {
    return {
      isPopulated: false,
      publishedStrings: {},

      collectedRenderedStrings: {},
      allRenderedStrings: {},
      getStrings: () => get().publishedStrings,

      prePublishBaseOption: "NONE",
      prePublishAdditionsOption: "NONE",
      setPrePublishBaseOption: (p) => set({ prePublishBaseOption: p }),
      setPrePublishAdditionsOption: (p) =>
        set({ prePublishAdditionsOption: p }),
      getPrePublishBase: () => {
        const storeType = get().prePublishBaseOption;
        if (storeType === "PUBLISHED") return get().publishedStrings;
        return {};
      },
      getPrePublishAdditions: () => {
        const additionsOption = get().prePublishAdditionsOption;
        if (additionsOption === "ALL_RENDERED_DRAFTS")
          return get().allRenderedStrings;
        if (additionsOption === "COLLECTED_RENDERED_DRAFTS")
          return get().collectedRenderedStrings;
        return {};
      },

      getPublishableString: () => {
        return {
          ...get().getPrePublishBase(),
          ...get().getPrePublishAdditions(),
        };
      },

      defaultFallbackString: "",
      setDefaultFallbackString: (k) =>
        set(() => ({ defaultFallbackString: k })),

      collectionMode: "OFF",
      setCollectionMode: (collectionMode) => set(() => ({ collectionMode })),
      publishMode: "MERGE_ADDITIONS",
      setPublishMode: (publishMode) => set(() => ({ publishMode })),

      forceAddDraft: (p) => {
        set((state) => {
          const drafts = { ...state.collectedRenderedStrings, [p.k]: p.v };
          return { collectedRenderedStrings: drafts };
        });
      },
      addDraft: (p) => {
        set((state) => ({
          allRenderedStrings: { ...state.allRenderedStrings, [p.k]: p.v },
        }));

        if (get().collectionMode === "ON") return get().forceAddDraft(p);
      },

      populatePublishedStrings: async () => {
        console.log(/*LL*/ 106, {});
        get().forcePopulateStrings();
      },
      forcePopulateStrings: async () => {
        const response = await fetch("/api/cms", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(get().collectedRenderedStrings),
        });
        set({
          isPopulated: true,
          publishedStrings: await response.json(),
        });
      },
    };
  });
};

export const useStore = createReactCmsStore();
