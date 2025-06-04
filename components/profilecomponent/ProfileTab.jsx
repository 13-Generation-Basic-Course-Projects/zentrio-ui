import React from "react";
import ProfileComponent from "./ProfileComponent";

export default function ProfileTab({ achievements }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ProfileComponent achievements={achievements} />
    </div>
  );
}
