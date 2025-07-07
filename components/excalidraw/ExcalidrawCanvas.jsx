"use client";

import Script from "next/script";
import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { useEffect, useRef, useState } from "react";

const ExcalidrawLib = dynamic(
  () => import("@excalidraw/excalidraw").then((m) => m.Excalidraw),
  { ssr: false }
);

export default function ExcalidrawCanvas() {
  const excalidrawRef = useRef(null);
  const [hasUnsave, setHasUnsave] = useState(false);

  const handleChangle = (element) => {
    const hasContent = element.some(el => !el.isDeleted);
    setHasUnsave(hasContent);
  }

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if(hasUnsave){
        e.preventDefault();
        e.returnValue = 'Not Allow';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [hasUnsave])
  return (
    <>
      {}
      <Script id="excalidraw-asset-path" strategy="beforeInteractive">
        {`window["EXCALIDRAW_ASSET_PATH"] = location.origin;`}
      </Script>

      {}
      <div className="h-[70vh]">
          <ExcalidrawLib ref={excalidrawRef} onChange={(element) => handleChangle(element)}/> {/* use: npm install/yarn add react react-dom @excalidraw/excalidraw */}
      </div>
    </>
  );
}