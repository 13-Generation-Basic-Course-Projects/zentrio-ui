import React from "react";
import AchievmentComponent from "./AchievmentComponent";

export default function AchievmentTab({ achievements }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AchievmentComponent achievements={achievements} />
    </div>
  );
}
