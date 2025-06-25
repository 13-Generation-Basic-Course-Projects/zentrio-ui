import { getFileByFolderIdAction } from "@/action/document.action";
import DocumentEachFolder from "@/components/documentcomponent/DocumentEachFolder";
import { NavbarAuthorized } from "@/components/layout/NavbarAutherized";
import { Token } from "@/constant/token";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;
  const { workspaceId } = await params;
  const boardId = await params?.boardId;
  const userToken = await Token();
  const token = userToken.GoogleDocumentToken;
  const isHidden = false;
  const tokenFromGoogle = token;

  let fetchedData = [];
  try {
    const result = await getFileByFolderIdAction(tokenFromGoogle, id);
    if (Array.isArray(result)) {
      fetchedData = result;
    } else if (result && Array.isArray(result.payload)) {
      fetchedData = result.payload;
    } else if (result && Array.isArray(result.files)) {
      fetchedData = result.files;
    }
  } catch (error) {
    console.error("Server fetch error:", error);
  }

  return (
    <div>
      <div className="p-4 ">
        <DocumentEachFolder
          id={id}
          tokenFromGoogle={tokenFromGoogle}
          boardId={boardId}
          workspaceId={workspaceId}
          isHidden={isHidden}
          initialData={fetchedData}
        />
      </div>
    </div>
  );
}
