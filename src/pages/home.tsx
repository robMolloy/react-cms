import React, { useState } from "react";
import { Cms, useStore } from "@/modules/react-cms";

const Page: React.FC = () => {
  const store = useStore();
  const [state, setState] = useState(false);
  return (
    <main className="flex min-h-screen p-24">
      <div>
        <button onClick={() => setState(true)}>asd</button>
        <div>asd</div>
        <div>asd</div>
        <Cms id="cms-comp-id">asd</Cms>

        {state && <Cms id="cms-comp-id2">blah</Cms>}

        <pre>{JSON.stringify(store.strings, undefined, 2)}</pre>
      </div>
    </main>
  );
};

export default Page;
