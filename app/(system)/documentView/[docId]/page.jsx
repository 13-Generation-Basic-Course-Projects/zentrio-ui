"use client";

import { useParams } from "next/navigation";

import CardFolder, { CardFile } from "@/components/card/CardDoc";
import { documentData } from "@/data/docu/documentData";

export default function DocumentView() {
  const { docId } = useParams();

  // Filter items where parent === docId
  const itemsInFolder = documentData.filter((item) => item.parent === docId);

  // Separate folders and files
  const folders = itemsInFolder.filter((item) => item.type === "folder");
  const files = itemsInFolder.filter((item) => item.type !== "folder");

  return (
    <><p>Hello</p>
    </>
  );
}
