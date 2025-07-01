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
          next: { revalidate: 60 },
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
    const url = documentRouteGroup.downloadAllFilesAsZip({ documentId, accessToken });
    console.log("url: ", url)
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 404) {
      return { status: 404, blob: null, fileName: null };
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
    console.error("Error in downloadAllFilesAsZip:", error.message);
    return { status: error.status || 500, message: error.message };
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
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
    throw error;
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

/*
 * Private document by document id
 */
export const privateDocumentByIdService = async (
  documentId,
  token,
  tokenFromGoogle
) => {
  try {
    const url = documentRouteGroup.makeDocumentPrivate(
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

    return await res.json();
  } catch (error) {
    console.error("Error in privateDocumentByIdService: ", error.message);
    throw error;
  }
};

/* new add
 * get all document by board id
 */
export const getAllDocumentByBoardIdSerivce = async ({ boardId, token }) => {
  try {
    const url = documentRouteGroup.getAllDocumentByBoardId(boardId);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      throw new Error(
        `Failed to get all document by boardId: ${res.status} ${
          errorData?.message || ""
        }`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Error in getAllDocumentByBoardIdSerivce: ", error.message);
  }
};

/* new add
 * post attactment
 */


/* new add
 * post attactment
 */
export const getAttactmentService = async ({ checklistId, token }) => {
  
    const url = documentRouteGroup.getAttactment(checklistId);
    console.log("Fetching from URL:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);
    const result = await res.json();
    console.log("in serviceee fetch data", result);
    return result;
};







export const getAttachmentService = async ({ checklistId, token }) => {
  try {
    const url = documentRouteGroup.getAttactment(checklistId);
    console.log("Fetching from URL:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is ok (status 200-299)
    if (!res.ok) {
      if (res.status === 404) {
        return {
          success: false,
          error: "No attachments found",
          status: res.status,
        };
      } else {
        return {
          success: false,
          error: `HTTP ${res.status}: ${res.statusText}`,
          status: res.status,
        };
      }
    }

    const result = await res.json();
    console.log("in serviceee fetch data", result);
    return result;
  } catch (error) {
    console.error("Network error:", error.message);
    return {
      success: false,
      error: `Network error: ${error.message}`,
    };
  }
};

//au
export const postAttachmentService = async ({
  checklistId,
  details,
  token,
}) => {
  try {
    // 1. Get existing attachment
    const existingAttachments = await getAttachmentService({
      checklistId,
      token,
    });

    console.log("exxxxxxxxxxxx", existingAttachments);

    const hasExisting =
      existingAttachments?.success && existingAttachments?.payload;
    const attachmentId =
      existingAttachments?.payload?.attachmentId;

    console.log("aaaaaaaaaaaaa", attachmentId);
    const method = hasExisting ? "PUT" : "POST";
    const url = hasExisting
      ? documentRouteGroup.updateAttachment(attachmentId, checklistId)
      : documentRouteGroup.postAttactment(checklistId);

    if (!url) throw new Error("URL could not be resolved");

    console.log(`Sending ${method} to:`, url);

    const res = await fetch(url, {
      method,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error in postAttachmentService:", error.message);
    throw error;
  }
};

// export const postAttachmentService = async ({ checklistId, details, token }) => {


//   console.log("DEtaila dataaaaaaaaaaaaaaaaaa", details);
  
//   try {
//     const url = documentRouteGroup.postAttactment(checklistId);
  
//       console.log("url in post attachment service", url);
//       console.log("token in post attachment service", token);
//       console.log("checklist id", checklistId);
//     const res = await fetch(url, {
//       method: "POST",
//       headers: {
//         Accept: "*/*",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(details), // Remove the extra wrapping
//     });

//     const result = await res.json();
//     return result;
//   } catch (error) {
//     console.error("Error : ", error.message);
//   }
// };