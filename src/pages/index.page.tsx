import React, { useState } from "react";
import {
  Cms,
  useStore,
  TCollectionMode,
  TPublishMode,
  TStoreType,
} from "@/modules/react-cms";

const style = { border: "1px solid blue", marginRight: "10px", flex: 1 };

const Page: React.FC = () => {
  const store = useStore();

  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState("asd");

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
        <button onClick={() => store.populatePublishedStrings()}>
          populatePublishedStrings
        </button>
        <br />
        <input
          placeholder="text"
          type="text"
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <h3>Components</h3>
          <button onClick={() => setToggle(!toggle)}>toggle comp</button>

          <Cms id="cms-comp-id">asd</Cms>
          {toggle && <Cms id="cms-comp-id2">{text}</Cms>}
        </span>
      </div>

      <div style={{ marginTop: "20px", display: "flex" }}>
        <span style={style}>
          <h3>storeType1</h3>
          <select
            onChange={(e) =>
              store.setStoreType1(e.target.value as TStoreType | "NONE")
            }
            value={store.storeType1}
          >
            <option value="NONE">NONE</option>
            <option value="ALL_DRAFTS">ALL_DRAFTS</option>
            <option value="COLLECTED_DRAFTS">COLLECTED_DRAFTS</option>
            <option value="PUBLISHED">PUBLISHED</option>
          </select>
          <pre>{JSON.stringify(store.storeType1, undefined, 2)}</pre>
          <pre>{JSON.stringify(store.getStoreType1(), undefined, 2)}</pre>
        </span>
        <span style={style}>
          <h3>storeType2</h3>
          <select
            onChange={(e) =>
              store.setStoreType2(e.target.value as TStoreType | "NONE")
            }
            value={store.storeType2}
          >
            <option value="NONE">NONE</option>
            <option value="ALL_DRAFTS">ALL_DRAFTS</option>
            <option value="COLLECTED_DRAFTS">COLLECTED_DRAFTS</option>
            <option value="PUBLISHED">PUBLISHED</option>
          </select>
          <pre>{JSON.stringify(store.storeType2, undefined, 2)}</pre>
          <pre>{JSON.stringify(store.getStoreType2(), undefined, 2)}</pre>
        </span>
        <span style={style}>
          <h3>storeType3</h3>
          <select
            onChange={(e) =>
              store.setStoreType3(e.target.value as TStoreType | "NONE")
            }
            value={store.storeType3}
          >
            <option value="NONE">NONE</option>
            <option value="ALL_DRAFTS">ALL_DRAFTS</option>
            <option value="COLLECTED_DRAFTS">COLLECTED_DRAFTS</option>
            <option value="PUBLISHED">PUBLISHED</option>
          </select>
          <pre>{JSON.stringify(store.storeType3, undefined, 2)}</pre>
          <pre>{JSON.stringify(store.getStoreType3(), undefined, 2)}</pre>
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
