import { driveRouteGroup } from "@/routes/driveRoute";

export const deleteFileByFileIdService = async ({
  accessToken,
  fileId,
  token,
}) => {
  try {
    const url = driveRouteGroup.deleteFileByFileId({ fileId, accessToken });
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 404) {
      return { status: 404, message: "Document not found" };
    }

    if (!res.ok) {
      throw new Error(`Failed to delete document: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error in deleteFile:", error.message);
    return { status: error.status || 500, message: error.message };
  }
};

export const downloadFileFromDriveService = async ({
  fileId,
  accessToken,
  token,
}) => {
  try {
    const url = driveRouteGroup.downloadFileFromDrive({ fileId, accessToken });
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
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
    console.error("Error in downloadFileFromDrive:", error.message);
    return { status: error.status || 500, message: error.message };
  }
};

export const updateFileNameByFileIdService = async ({
  accessToken,
  fileId,
  newName,
  token,
}) => {
  try {
    const url = driveRouteGroup.updateFileNameByFileId({
      accessToken,
      fileId,
      newName,
    });

    console.log("url: ", url);

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Backend failed:", res.status, errorText);
      throw new Error(`Failed to update file name. Status: ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("❌ updateFileNameByFileIdService error:", error.message);
    throw error;
  }
};

export const getDriveFileByIdService = async ({
  accessToken,
  fileId,
  token,
}) => {
  try {
    const url = driveRouteGroup.getDriveFileById({ accessToken, fileId });

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Backend failed:", res.status, errorText);
      throw new Error(`Failed to get drive file. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getDriveFileByIdService error: ", error.message);
    throw error;
  }
};

/*
 * Upload file to folder
 */
export const uploadDocumentToFolderServie = async ({
  tokenFromGoogle,
  folderId,
  file,
  token,
}) => {
  try {
    const url = driveRouteGroup.uploadDocumentToFolder({
      folderId,
      tokenFromGoogle,
    });
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
