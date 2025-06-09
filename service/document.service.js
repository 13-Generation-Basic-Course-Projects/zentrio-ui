"use server";

import { documentRouteGroup } from "@/routes/documentRoute";

/*
 * get document by document Id
 */
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

/*
 * get all documents by board Id
 */
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

/*
 * get file by folder Id
 */
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

/**
 * Download document by document ID
 */
export const downloadDocumentByDocumentIdService = async ({
  documentId,
  accessToken,
  token,
}) => {
  const url = documentRouteGroup.downloadDocumentByDocumentId(
    documentId,
    accessToken
  );

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "*/*",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to download file");
  }

  const blob = await res.blob();

  // Extract filename from headers
  const contentDisposition = res.headers.get("Content-Disposition");
  let fileName = "document";

  if (contentDisposition && contentDisposition.includes("filename=")) {
    const match = contentDisposition.match(
      /filename[^;=\n]*=(['"]?)([^'"\n]*)\1?/
    );
    if (match && match.length >= 3) {
      fileName = decodeURIComponent(match[2]);
    }
  }

  return { blob, fileName };
};

/*
 * delete document by document Id
 */
export const deleteDocumentService = async ({
  accessToken,
  documentId,
  token,
}) => {
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

/*
 * create new document
 */
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

/*
 * create new document by file upload
 */
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

/*
 * create drive file
 */
export const createDriveFileService = async (
  name,
  folderId,
  fileType,
  token,
  tokenFromGoogle
) => {
  const url = documentRouteGroup.createDriveFile(
    name,
    folderId,
    fileType,
    tokenFromGoogle // accessToken in query param
  );

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("❌ Error creating drive file:", data);
    throw new Error(`Failed to create drive file: ${res.status}`);
  }

  return data;
};

/*
 * Update document name by document id
 */
export const updateDocumentNameByIdService = async (documentId, newName, token, tokenFromGoogle) => {
  const url = documentRouteGroup.updateDocumentById(documentId, tokenFromGoogle, newName); // now includes name in URL

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
      // ✅ Don't send body, because name is in the URL
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(errorData?.message || `Request failed with status ${res.status}`);
    }

    const updatedDocument = await res.json();
    return updatedDocument;
  } catch (error) {
    console.error("Error updating document name:", error);
    throw error;
  }
};

