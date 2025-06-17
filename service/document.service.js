"use server";

import { documentRouteGroup } from "@/routes/documentRoute";

/*
 * Get document by document ID
 */
export const fetchDocumentService = async (id, token) => {
  try {
    const res = await fetch(documentRouteGroup.getDocumentById(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 404) {
      return { status: 404, payload: [] }; // Return empty payload for 404
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch document: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in fetchDocumentService:", error.message);
    return { status: error.status || 500, payload: [] }; // Fallback for other errors
  }
};

/*
 * Get public documents by board ID
 */
export const fetchPublicDocumentsService = async (boardId, token) => {
  try {
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

    if (res.status === 404) {
      return { status: 404, payload: [] }; // Return empty payload for 404
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch public documents: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in fetchPublicDocumentsService:", error.message);
    return { status: error.status || 500, payload: [] }; // Fallback for other errors
  }
};

/*
 * Get all documents by board ID
 */
export const fetchDocumentsByBoardService = async (boardId, token) => {
  try {
    const res = await fetch(
      documentRouteGroup.getAllDocumentsByBoard(boardId),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 404) {
      return { status: 404, payload: [] }; // Return empty payload for 404
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch documents: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in fetchDocumentsByBoardService:", error.message);
    return { status: error.status || 500, payload: [] }; // Fallback for other errors
  }
};

/*
 * Get files by folder ID
 */
export const getFileByFolderIdService = async ({ accessToken, folderId, token }) => {
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

    if (res.status === 404) {
      return { status: 404, payload: [] }; // Return empty payload for 404
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch files by folder: ${res.status}`);
    }

    const data = await res.json();
    console.log("📥 Backend responded with:", data);
    return data;
  } catch (error) {
    console.error("Error in getFileByFolderIdService:", error.message);
    return { status: error.status || 500, payload: [] }; // Fallback for other errors
  }
};

/*
 * Download document by document ID
 */
export const downloadDocumentByDocumentIdService = async ({
  documentId,
  accessToken,
  token,
}) => {
  try {
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

    if (res.status === 404) {
      return { status: 404, blob: null, fileName: null }; // Return null for blob and fileName
    }

    if (!res.ok) {
      throw new Error(`Failed to download file: ${res.status}`);
    }

    const blob = await res.blob();
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

    return { status: 200, blob, fileName };
  } catch (error) {
    console.error(
      "Error in downloadDocumentByDocumentIdService:",
      error.message
    );
    return { status: error.status || 500, blob: null, fileName: null }; // Fallback for other errors
  }
};

/*
 * Download all files as zip
 */
export const downloadAllFilesAsZipService = async ({
  documentId,
  accessToken,
  token,
}) => {
  try {
    const url = documentRouteGroup.downloadAllFilesAsZip(
      documentId,
      accessToken
    );
    console.log("Calling backend with:", { url, token });

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    if (res.status === 404) {
      return { status: 404, blob: null, filename: null }; // Return null for blob and filename
    }

    if (!res.ok) {
      throw new Error(
        `Failed to download ZIP file: ${res.status} ${res.statusText}`
      );
    }

    const blob = await res.blob();
    const contentDisposition = res.headers.get("Content-Disposition");
    const filenameMatch = contentDisposition?.match(/filename="(.+?)"/);
    const filename = filenameMatch
      ? filenameMatch[1]
      : `folder-${documentId}.zip`;

    return { status: 200, blob, filename };
  } catch (error) {
    console.error("Error in downloadAllFilesAsZipService:", error.message);
    return { status: error.status || 500, blob: null, filename: null }; // Fallback for other errors
  }
};

/*
 * Delete document by document ID
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

    if (res.status === 404) {
      return { status: 404, message: "Document not found" }; // Handle 404 case
    }

    if (!res.ok) {
      throw new Error(`Failed to delete document: ${res.status}`);
    }

    const data = await res.json();
    console.log("📥 Backend responded with:", data);
    return data;
  } catch (error) {
    console.error("Error in deleteDocumentService:", error.message);
    return { status: error.status || 500, message: error.message }; // Fallback for other errors
  }
};

/*
 * Create new document
 */
export const createDocumentService = async (data, token) => {
  try {
    const url = documentRouteGroup.createDocument();
    console.log("Creating document with data:", data);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error details:", errorText);
      throw new Error(`Failed to create document: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in createDocumentService:", error.message);
    throw error; // Rethrow to handle in action or component
  }
};

/*
 * Create new document by file upload
 */
export const createDocumentByUploadService = async (
  formData,
  boardId,
  token,
  tokenFromGoogle
) => {
  try {
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

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error in createDocumentByUploadService:", errorText);
      throw new Error(`Failed to upload document: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in createDocumentByUploadService:", error.message);
    throw error; // Rethrow to handle in action or component
  }
};

/*
 * Create drive file
 */
export const createDriveFileService = async (
  name,
  folderId,
  fileType,
  token,
  tokenFromGoogle
) => {
  try {
    const url = documentRouteGroup.createDriveFile(
      name,
      folderId,
      fileType,
      tokenFromGoogle
    );
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        `Failed to create drive file: ${res.status} ${errorData?.message || ""}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error in createDriveFileService:", error.message);
    throw error; // Rethrow to handle in action or component
  }
};

/*
 * Upload file to folder
 */
export const uploadDocumentToFolderServie = async (
  file,
  folderId,
  token,
  tokenFromGoogle
) => {
  try {
    const url = documentRouteGroup.uploadDocumentToFolder(
      folderId,
      tokenFromGoogle
    );
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error in uploadDocumentToFolderServie:", errorText);
      throw new Error(`Failed to upload file to folder: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error in uploadDocumentToFolderServie:", error.message);
    throw error; // Rethrow to handle in action or component
  }
};

/*
 * Update document name by document ID
 */
export const updateDocumentNameByIdService = async (
  documentId,
  newName,
  token,
  tokenFromGoogle
) => {
  try {
    const url = documentRouteGroup.updateDocumentById(
      documentId,
      tokenFromGoogle,
      newName
    );
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        `Failed to update document name: ${res.status} ${
          errorData?.message || ""
        }`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error in updateDocumentNameByIdService:", error.message);
    throw error; // Rethrow to handle in action or component
  }
};

/*
 * Public document by document id
 */
export const publicDocumentByIdService = async (
  documentId,
  token,
  tokenFromGoogle
) => {
  try {
    const url = documentRouteGroup.makeDocumentPublic(
      documentId,
      tokenFromGoogle
    );

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        `Failed to update document name: ${res.status} ${
          errorData?.message || ""
        }`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error in publicDocumentByIdService: ", error.message);
    throw error;
  }
};
