import React from "react";
import {
  TCollectionMode,
  TPrePublishAdditionOption,
  TPrePublishBaseOption,
  useStore,
} from "@/modules/react-cms";
import { MenuItem, Select } from "@mui/material";

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ margin: "0" }}>{children}</h3>
);

export type TControlPanel = React.FC;
const style = { border: "1px solid blue", marginRight: "10px", flex: 1 };

export const ControlPanel: TControlPanel = () => {
  const store = useStore();
  return (
    <div>
      <div style={{ marginTop: "20px", display: "flex" }}>
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

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              {"{"}
              <div style={{ padding: "0 15px" }}>
                {Object.entries(store.getPrePublishBase()).map(([k, v]) => (
                  <div
                    key={k}
                    onClick={() => store.togglePrePublishBaseRemovalKey(k)}
                    style={(() => {
                      const hasKey =
                        store.prePublishBaseRemovalKeys.includes(k);
                      const addProps = hasKey ? { background: "red" } : {};
                      return { cursor: "pointer", ...addProps };
                    })()}
                  >
                    {k}: {JSON.stringify(v)}
                  </div>
                ))}
              </div>
              {"}"}
            </div>
            <div>
              <pre>
                {JSON.stringify(
                  store.getCombinedPrePublishBase(),
                  undefined,
                  2
                )}
              </pre>
            </div>
          </div>
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

          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              {"{"}
              <div style={{ padding: "0 15px" }}>
                {Object.entries(store.getPrePublishAdditions()).map(
                  ([k, v]) => (
                    <div
                      key={k}
                      onClick={() =>
                        store.togglePrePublishAdditionsRemovalKey(k)
                      }
                      style={(() => {
                        const hasKey =
                          store.prePublishAdditionsRemovalKeys.includes(k);
                        const addProps = hasKey ? { background: "red" } : {};
                        return { cursor: "pointer", ...addProps };
                      })()}
                    >
                      {k}: {JSON.stringify(v)}
                    </div>
                  )
                )}
              </div>
              {"}"}
            </div>
            <pre>
              {JSON.stringify(
                store.getCombinedPrePublishAdditions(),
                undefined,
                2
              )}
            </pre>
          </div>
        </span>
      </div>

      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <H3>publishable</H3>
          <pre>
            {JSON.stringify(store.getPublishableString(), undefined, 2)}
          </pre>
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
        </span>

        <span style={style}>
          <H3>full store</H3>
          <pre>{JSON.stringify(store, undefined, 2)}</pre>
        </span>
      </div>
    </div>
  );
};
