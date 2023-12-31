import React, { useEffect, useState } from "react";
import { useStore } from "../stores";

export type TCmsText = React.FC<{
  children: string;
  id: string;
}>;

export const CmsText: TCmsText = ({ children: draft, id }) => {
  const store = useStore();
  const [currentText, setCurrentText] = useState(
    (() => {
      if (!store.isPopulated) return "";

      const value = store.publishedStrings[id];
      return value ? value : draft;
    })()
  );
  const [inputText, setInputText] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setInputText(currentText);
    store.addDraft({ k: id, v: currentText });
  }, [currentText]);

  useEffect(() => {
    if (!store.isPopulated) return;
    const value = store.publishedStrings[id];
    if (value) setCurrentText(value);
    else setCurrentText(draft);
  }, [store.publishedStrings]);

  return (
    <>
      <pre>{JSON.stringify({ currentText, inputText }, undefined, 2)}</pre>
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        style={{
          border: `1px solid ${isHover ? "blue" : "white"}`,
          margin: "2px",
          cursor: "pointer",
          display: "inline-block",
        }}
      >
        {editMode && (
          <>
            <div style={{ position: "relative", padding: "3px" }}>
              <div
                style={{ position: "absolute", right: 0, top: 0 }}
                onClick={() => setEditMode(!editMode)}
              >
                <span onClick={() => setCurrentText(inputText)}>Y</span>
                <span onClick={() => setInputText(currentText)}>N</span>
              </div>
              <input
                placeholder={id}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>
          </>
        )}

        {!editMode && (
          <div onClick={() => setEditMode(!editMode)}>{currentText}</div>
        )}
      </div>
    </>
  );
};
