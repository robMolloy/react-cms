import { create } from "zustand";

type THintString<T extends string> = Exclude<string, T> | T;

type TStore = {
  strings: { [k: string]: string };
  forceAddKV: (p: { k: string; v: string }) => void;
  addKV: (p: { k: string; v: string }) => void;
  mode: "READ" | "OVERWRITE_DRAFTS" | "WRITE_NEW_DRAFTS";
  version: THintString<"@latest">;
};

export const useStore = create<TStore>((set, get) => ({
  strings: { test: "string" },
  forceAddKV: (p) => {
    console.log(/*LL*/ 16, { p });
    set((state) => {
      const strings = { ...state.strings, [p.k]: p.v };
      return { ...state, strings };
    });
  },
  addKV: (p) => {
    const got = get();
    if (got.mode === "READ") return;
    if (got.mode === "OVERWRITE_DRAFTS") return got.forceAddKV(p);
    if (got.mode === "WRITE_NEW_DRAFTS") {
      const isNewKey = Object.keys(got.strings).includes(p.k);
      if (isNewKey) return got.forceAddKV(p);
    }
  },
  mode: "OVERWRITE_DRAFTS",
  version: "@latest",
}));
