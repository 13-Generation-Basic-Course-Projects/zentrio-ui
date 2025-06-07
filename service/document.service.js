"use server";

import { documentRouteGroup } from "@/routes/documentRoute";

// GET document by ID
export const fetchDocumentService = async (id, token) => {
  const res = await fetch(documentRouteGroup.getDocumentById(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
};

/*
 * get public documents by board
 */
export const fetchPublicDocumentsService = async (boardId, token) => {
  const res = await fetch(
    documentRouteGroup.getPublicDocumentsByBoard(boardId),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
};

// GET documents by board
export const fetchDocumentsByBoardService = async (boardId, token) => {
  const res = await fetch(
    documentRouteGroup.getAllDocumentsByBoard(boardId), // URL only
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
};

// GET File by folder id
export const getFileByFolderIdService = async ({
  accessToken,
  folderId,
  token,
}) => {
  try {
    const res = await fetch(
      documentRouteGroup.getFileByFolderId(folderId, accessToken),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log("📥 Backend responded with:", data);

    return data;
  } catch (error) {
    console.error("Login service error:", error.message);
    throw error;
  }
};

// DELETE document by ID
export const deleteDocumentService = async ({
  accessToken,
  documentId,
  token,
}) => {
  console.log("accc====", accessToken);
  console.log("docid=====", documentId);
  try {
    const res = await fetch(
      documentRouteGroup.deleteDocumentById(documentId, accessToken),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log("📥 Backend responded with:", data);
    return data;
  } catch (error) {
    console.error("Delete service error:", error.message);
  }
};
// POST (create) new document
export const createDocumentService = async (data, token) => {
  const res = await fetch(documentRouteGroup.createDocument(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create document: ${res.status}`);
  }

  return res.json();
};

// POST (create) new document by upload
export const createDocumentByUploadService = async (
  formData,
  boardId,
  token,
  tokenFromGoogle
) => {
  console.log("token iside the service uploadfile", token);

  console.log("data the service uploadfile", formData);
  console.log("googleToken the service uploadfile", tokenFromGoogle);
  const res = await fetch(
    documentRouteGroup.uploadDocumentToBoard(boardId, tokenFromGoogle),
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!res.success) {
    console.error("error of post file");
  }

  return res.json();
};
