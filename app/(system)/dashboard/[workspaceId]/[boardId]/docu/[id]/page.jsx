import { getBoardByBoardIdAction } from "@/action/board.action";
import { getFileByFolderIdAction } from "@/action/document.action";
import { getDriveFileByIdAction } from "@/action/drive.action";
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
  let currentFolderMeta = null;
  let fetchedData = [];
  let breadcrumbFolders = [];
  let boardName = "board";
  try {
    const boardRes = await getBoardByBoardIdAction(boardId);
    boardName = boardRes?.payload?.title || "Board";

    currentFolderMeta = await getDriveFileByIdAction({
      accessToken: tokenFromGoogle,
      fileId: id,
    });

    // Inline folder breadcrumb building
    let currentId = id;
    while (currentId) {
      const res = await getDriveFileByIdAction({
        accessToken: tokenFromGoogle,
        fileId: currentId,
      });

      const file = res?.payload;
      if (!file || file.mimeType !== "application/vnd.google-apps.folder")
        break;

      breadcrumbFolders.unshift({
        label: file.name,
        href: null, // Optional: You can generate real links here if needed
      });

      currentId = file.parents?.[0]; // Go up the folder chain
    }

    if (
      currentFolderMeta?.payload.mimeType ===
      "application/vnd.google-apps.folder"
    ) {
      const result = await getFileByFolderIdAction(tokenFromGoogle, id);
      if (Array.isArray(result)) {
        fetchedData = result;
      } else if (result && Array.isArray(result.payload)) {
        fetchedData = result.payload;
      } else if (result && Array.isArray(result.files)) {
        fetchedData = result.files;
      }
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
          boardName={boardName}
          workspaceId={workspaceId}
          isHidden={isHidden}
          initialData={fetchedData}
          currentFolderMeta={currentFolderMeta}
          breadcrumbFolders={breadcrumbFolders}
        />
      </div>
    </div>
  );
}
