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

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ margin: "0" }}>{children}</h3>
);

const style = { border: "1px solid blue", marginRight: "10px", flex: 1 };

const Page: React.FC = () => {
  const store = useStore();

  const [showTogglableComponent, setShowTogglableComponent] = useState(false);
  const [togglableComponentText, setTogglableComponentText] = useState("asd");

  return (
    <main className="flex min-h-screen p-24">
      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <H3>Components</H3>
          <br />
          cms-comp-id-1: <CmsText id="cms-comp-id-1">asd</CmsText>
          <br />
          hello-nick: <CmsText id="hello-nick">asd</CmsText>
          <br />
          <br />
          <button
            onClick={() => setShowTogglableComponent(!showTogglableComponent)}
          >
            toggle comp
          </button>
          <br />
          <div>set toggleable component text</div>
          <input
            placeholder="text"
            type="text"
            defaultValue={togglableComponentText}
            onChange={(e) => setTogglableComponentText(e.target.value)}
          />
          <br />
          <br />
          {showTogglableComponent && (
            <>
              cms-comp-id2:
              <CmsText id="cms-comp-id2">{togglableComponentText}</CmsText>
            </>
          )}
          <br />
        </span>
      </div>

      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <H3>Control Panel</H3>
          <br />
          Collection mode:
          <br />
          <select
            onChange={(e) =>
              store.setCollectionMode(e.target.value as TCollectionMode)
            }
            defaultValue={store.collectionMode}
          >
            <option value="ON">ON</option>
            <option value="OFF">OFF</option>
          </select>
          <br />
          <br />
          Publish mode:
          <br />
          <select
            onChange={(e) =>
              store.setPublishMode(e.target.value as TPublishMode)
            }
            defaultValue={store.publishMode}
          >
            <option value="MERGE_ADDITIONS">MERGE_ADDITIONS</option>
            <option value="REMOVE_ADDITIONS">REMOVE_ADDITIONS</option>
          </select>
          <br />
          <br />
        </span>
        <span style={style}>
          <H3>Pre Publish Base</H3>
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
          <H3>Pre Publish Additions</H3>
          <Select
            onChange={(e) =>
              store.setPrePublishAdditionsOption(
                e.target.value as TPrePublishAdditionOption | "NONE"
              )
            }
            value={store.prePublishAdditionsOption}
          >
            <MenuItem value="NONE">NONE</MenuItem>
            <MenuItem value="ALL_RENDERED_DRAFTS">ALL_RENDERED_DRAFTS</MenuItem>
            <MenuItem value="COLLECTED_RENDERED_DRAFTS">
              COLLECTED_RENDERED_DRAFTS
            </MenuItem>
          </Select>
          <pre>
            {JSON.stringify(store.prePublishAdditionsOption, undefined, 2)}
          </pre>
          <pre>
            {JSON.stringify(store.getPrePublishAdditions(), undefined, 2)}
          </pre>
        </span>

        <span style={style}>
          <H3>publishable</H3>
          <pre>
            {JSON.stringify(store.getPublishableString(), undefined, 2)}
          </pre>
        </span>
      </div>
      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <H3>full store</H3>
          <pre>{JSON.stringify(store, undefined, 2)}</pre>
        </span>
        <span style={style}>
          <H3>publishedStrings</H3>
          <pre>{JSON.stringify(store.publishedStrings, undefined, 2)}</pre>
        </span>
        <span style={style}>
          <H3>collectedRenderedStrings</H3>
          <pre>
            {JSON.stringify(store.collectedRenderedStrings, undefined, 2)}
          </pre>
        </span>
        <span style={style}>
          <H3>allRenderedStrings</H3>
          <pre>{JSON.stringify(store.allRenderedStrings, undefined, 2)}</pre>
        </span>
      </div>
    </main>
  );
};

export default Page;
