import React from "react";
import Test from "@/components/modal/Modal";
import { SidebarTest } from "@/components/sidebar/SideBar";
export default function TestPage() {
  return (
    <div>
      <Test />
      <p className="text-5xl text-green-500">a</p>
      <SidebarTest />
    </div>
  );
}
