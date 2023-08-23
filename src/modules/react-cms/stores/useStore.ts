import { create, StoreApi, UseBoundStore } from "zustand";

export type THintString<T extends string> = Exclude<string, T> | T;

export type TCollectionMode = "ON" | "OFF";
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

  prePublishBaseRemovalKeys: string[];
  prePublishAdditionsRemovalKeys: string[];
  togglePrePublishBaseRemovalKey: (key: string) => void;
  togglePrePublishAdditionsRemovalKey: (key: string) => void;

  getCombinedPrePublishBase: () => TStrings;
  getCombinedPrePublishAdditions: () => TStrings;

  defaultFallbackString: string;
  setDefaultFallbackString: (k: string) => void;

  setCollectionMode: (mode: TCollectionMode) => void;
  collectionMode: TCollectionMode;

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
          ...get().getCombinedPrePublishBase(),
          ...get().getCombinedPrePublishAdditions(),
        };
      },

      prePublishBaseRemovalKeys: [],
      prePublishAdditionsRemovalKeys: [],
      togglePrePublishBaseRemovalKey: (key: string) => {
        const indexOfKey = get().prePublishBaseRemovalKeys.indexOf(key);
        const hasKey = indexOfKey !== -1;
        const copyKeys = [...get().prePublishBaseRemovalKeys];

        if (hasKey) {
          copyKeys.splice(indexOfKey, 1);
          return set(() => ({ prePublishBaseRemovalKeys: copyKeys }));
        }

        copyKeys.push(key);
        return set(() => ({ prePublishBaseRemovalKeys: copyKeys }));
      },
      togglePrePublishAdditionsRemovalKey: (key: string) => {
        const indexOfKey = get().prePublishAdditionsRemovalKeys.indexOf(key);
        const hasKey = indexOfKey !== -1;
        const copyKeys = [...get().prePublishAdditionsRemovalKeys];

        if (hasKey) {
          copyKeys.splice(indexOfKey, 1);
          return set(() => ({ prePublishAdditionsRemovalKeys: copyKeys }));
        }

        copyKeys.push(key);
        return set(() => ({ prePublishAdditionsRemovalKeys: copyKeys }));
      },

      getCombinedPrePublishBase: () => {
        const got = get();
        const removalKeys = got.prePublishBaseRemovalKeys;
        const strings = got.getPrePublishBase();

        const entries = Object.entries(strings);
        const combinedEntries = entries.filter(
          ([k]) => !removalKeys.includes(k)
        );
        const combined: TStrings = {};
        combinedEntries.forEach(([k, v]) => (combined[k] = v));
        return combined;
      },
      getCombinedPrePublishAdditions: () => {
        const got = get();
        const removalKeys = got.prePublishAdditionsRemovalKeys;
        const strings = got.getPrePublishAdditions();

        const entries = Object.entries(strings);
        const combinedEntries = entries.filter(
          ([k]) => !removalKeys.includes(k)
        );
        const combined: TStrings = {};
        combinedEntries.forEach(([k, v]) => (combined[k] = v));
        return combined;
      },

      defaultFallbackString: "",
      setDefaultFallbackString: (k) =>
        set(() => ({ defaultFallbackString: k })),

      collectionMode: "OFF",
      setCollectionMode: (collectionMode) => set(() => ({ collectionMode })),
      publishMode: "MERGE_ADDITIONS",

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
