import React, { useEffect } from "react";
import { useStore } from "../stores";

export type TCms = React.FC<{
  children: string;
  id: string;
}>;

export const Cms: TCms = ({ children: draft, id }) => {
  const store = useStore();
  useEffect(() => {
    store.addDraft({ k: id, v: draft });
  }, [draft, id, store.collectionMode]);

  return <div>{draft}</div>;
};
