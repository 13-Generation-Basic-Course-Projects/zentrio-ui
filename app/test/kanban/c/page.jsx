"use client";
import dynamic from "next/dynamic";
import React from "react";

// ✅ Turn off SSR for the PDF preview
const PDFPreview = dynamic(
  () => import("@/components/testcomponent/PreviewPDF"),
  { ssr: false }
);

export default function SimplePDF() {
  return <PDFPreview />;
}
