import React from "react";

export type TFloatingPanel = React.FC;

export const FloatingPanel: TFloatingPanel = () => {
  return (
    <div className="relative h-32 w-32">
      <div className="absolute bottom-0 right-0 h-16 w-16">09</div>
    </div>
  );
};
