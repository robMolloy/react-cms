import React, { useState } from "react";
import {
  CmsText,
  useStore,
  TCollectionMode,
  TPublishMode,
  TPrePublishAdditionOption,
  TPrePublishBaseOption,
} from "@/modules/react-cms";
import { MenuItem, Select } from "@mui/material";

const style = { border: "1px solid blue", marginRight: "10px", flex: 1 };

const Page: React.FC = () => {
  const store = useStore();

  const [showTogglableComponent, setShowTogglableComponent] = useState(false);
  const [togglableComponentText, setTogglableComponentText] = useState("asd");

  return (
    <main className="flex min-h-screen p-24">
      <div>
        Collection mode:
        <select
          onChange={(e) =>
            store.setCollectionMode(e.target.value as TCollectionMode)
          }
          defaultValue={store.collectionMode}
        >
          <option value="READ_ONLY">READ_ONLY</option>
          <option value="WRITE_NEW_DRAFTS">WRITE_NEW_DRAFTS</option>
          <option value="OVERWRITE_DRAFTS">OVERWRITE_DRAFTS</option>
        </select>
        <br />
        Publish mode:
        <select
          onChange={(e) => store.setPublishMode(e.target.value as TPublishMode)}
          defaultValue={store.publishMode}
        >
          <option value="SET_COLLECTED">SET_COLLECTED</option>
          <option value="MERGE_COLLECTED">MERGE_COLLECTED</option>
          <option value="REMOVE_COLLECTED">REMOVE_COLLECTED</option>
        </select>
        <br />
        <button onClick={() => store.populatePublishedStrings()}>
          populatePublishedStrings
        </button>
        <br />
        <input
          placeholder="text"
          type="text"
          defaultValue={togglableComponentText}
          onChange={(e) => setTogglableComponentText(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <h3>Components</h3>
          <button
            onClick={() => setShowTogglableComponent(!showTogglableComponent)}
          >
            toggle comp
          </button>

          <CmsText id="cms-comp-id">asd</CmsText>
          {showTogglableComponent && (
            <CmsText id="cms-comp-id2">{togglableComponentText}</CmsText>
          )}
        </span>
      </div>

      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <h3>Pre Publish Base</h3>
          <Select
            onChange={(e) =>
              store.setPrePublishBaseOption(
                e.target.value as TPrePublishBaseOption
              )
            }
            value={store.prePublishBaseOption}
          >
            <MenuItem value="NONE">NONE</MenuItem>
            <MenuItem value="PUBLISHED">PUBLISHED</MenuItem>
          </Select>
          <pre>{JSON.stringify(store.prePublishBaseOption, undefined, 2)}</pre>
          <pre>{JSON.stringify(store.getPrePublishBase(), undefined, 2)}</pre>
        </span>
        <span style={style}>
          <h3>Pre Publish Additions</h3>
          <Select
            onChange={(e) =>
              store.setPrePublishAdditionsOption(
                e.target.value as TPrePublishAdditionOption | "NONE"
              )
            }
            value={store.prePublishAdditionsOption}
          >
            <MenuItem value="NONE">NONE</MenuItem>
            <MenuItem value="ALL_DRAFTS">ALL_DRAFTS</MenuItem>
            <MenuItem value="COLLECTED_DRAFTS">COLLECTED_DRAFTS</MenuItem>
          </Select>
          <pre>
            {JSON.stringify(store.prePublishAdditionsOption, undefined, 2)}
          </pre>
          <pre>
            {JSON.stringify(store.getPrePublishAdditions(), undefined, 2)}
          </pre>
        </span>

        <span style={style}>
          <h3>publishable</h3>
          <pre>
            {JSON.stringify(store.getPublishableString(), undefined, 2)}
          </pre>
        </span>
      </div>
      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <h3>full store</h3>
          <pre>{JSON.stringify(store, undefined, 2)}</pre>
        </span>
        <span style={style}>
          <h3>publishedStrings</h3>
          <pre>{JSON.stringify(store.publishedStrings, undefined, 2)}</pre>
        </span>
        <span style={style}>
          <h3>collectedDraftStrings</h3>
          <pre>{JSON.stringify(store.collectedDraftStrings, undefined, 2)}</pre>
        </span>
        <span style={style}>
          <h3>allDraftStrings</h3>
          <pre>{JSON.stringify(store.allDraftStrings, undefined, 2)}</pre>
        </span>
      </div>
    </main>
  );
};

export default Page;
