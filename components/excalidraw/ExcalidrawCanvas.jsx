"use client";

import Script from "next/script";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";

const ExcalidrawLib = dynamic(
  () => import("@excalidraw/excalidraw").then((m) => m.Excalidraw),
  { ssr: false }
);

export default function ExcalidrawCanvas() {
  return (
    <>
      {}
      <Script id="excalidraw-asset-path" strategy="beforeInteractive">
        {`window["EXCALIDRAW_ASSET_PATH"] = location.origin;`}
      </Script>

      {}
      <div className="h-[70vh]">
          <ExcalidrawLib />
      </div>
    </>
  );
}