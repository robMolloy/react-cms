import { LockOpen } from "@mui/icons-material";
import React from "react";

const Page: React.FC = () => {
  return (
    <>
      <div className="absolute bottom-0 w-screen">
        <div className="flex justify-end p-8">
          <div className="cursor-pointer bg-slate-700 hover:bg-slate-600 rounded-full flex divide-x-2  border-2 border-slate-300 divide-slate-300">
            <div className="p-8">
              <LockOpen />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
