"use client";

import ExcalidrawCanvas from "@/components/excalidraw/ExcalidrawCanvas";


export default function Draw() {
  return (
    <div className="m-10 p-2 border-2 rounded-2xl">
      <ExcalidrawCanvas />
    </div>
  );
}