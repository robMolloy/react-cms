import React, { useState } from "react";
import { CmsText, useStore } from "@/modules/react-cms";
import { MenuItem, Select } from "@mui/material";
import { createPocketBaseDb } from "@/modules/pocketbase";
import { Check, Clear } from "@mui/icons-material";
import { ControlPanelToggle } from "@/modules/react-cms/components/controlPanel/ControlPanelToggle";
import { FloatingPanel } from "@/modules/react-cms/components/floatingPanel/FloatingPanel";

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ margin: "0" }}>{children}</h3>
);

const getStrings = async () => {
  const db1 = createPocketBaseDb();
  const resp = await db1.collection("strings").getFirstListItem("");
};

const style = { border: "1px solid blue", marginRight: "10px", flex: 1 };

const Page: React.FC = () => {
  const [showTogglableComponent, setShowTogglableComponent] = useState(false);

  return (
    <>
      <ControlPanelToggle />
      <FloatingPanel />

      <section className="bg-gray text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Understand User Flow.
              <span className="sm:block"> Increase Conversion. </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
              illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/get-started"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="/about"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      <main className="min-h-screen p-24">
        <Check />
        <Clear />

        <div style={{ marginTop: "20px", display: "flex" }}>
          <span style={{ ...style, border: "1px solid white" }}>
            <H3>Components</H3>
            <br />
            cms-comp-id-1: <CmsText id="cms-comp-id-1">cms-comp-id-1</CmsText>
            <br />
            hello-nick: <CmsText id="hello-nick">hello-nick</CmsText>
            <br />
            <br />
            <button
              onClick={() => setShowTogglableComponent(!showTogglableComponent)}
            >
              toggle comp
            </button>
            <br />
            {showTogglableComponent && (
              <>
                cms-comp-id-2:
                <CmsText id="cms-comp-id-2">cms-comp-id-2</CmsText>
              </>
            )}
            <br />
            <button
              onClick={async () => {
                getStrings();
              }}
            >
              asd
            </button>
          </span>
        </div>
      </main>
    </>
  );
};

export default Page;
