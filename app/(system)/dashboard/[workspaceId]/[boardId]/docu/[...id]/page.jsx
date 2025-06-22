import DocumentEachFolder from "@/components/documentcomponent/DocumentEachFolder";
import React from "react";

export default async function page({ params }) {
  const { id } = params;

  return (
    <div>
      <DocumentEachFolder id={id} />
    </div>
  );
}
