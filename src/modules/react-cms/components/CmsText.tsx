import React, { useEffect, useState } from "react";
import { useStore } from "../stores";

export type TCmsText = React.FC<{
  children: string;
  id: string;
}>;

export const CmsText: TCmsText = ({ children: draft, id }) => {
  const store = useStore();
  const [currentText, setCurrentText] = useState(draft);
  const [editMode, setEditMode] = useState(false);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    store.addDraft({ k: id, v: draft });
  }, [currentText]);

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={() => setEditMode(!editMode)}
      style={{
        border: `1px solid ${isHover ? "blue" : "white"}`,
        margin: "2px",
        cursor: "pointer",
        display: "inline-block",
      }}
    >
      {editMode ? (
        <input
          placeholder={id}
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
        />
      ) : (
        <div>{currentText}</div>
      )}
    </div>
  );
};
