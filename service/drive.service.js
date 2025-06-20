import { driveRouteGroup } from "@/routes/driveRoute";


export const deleteFileByFileIdService = async ({ accessToken, fileId, token }) => {
  try {
    const url = driveRouteGroup.deleteFileByFileId({fileId, accessToken});
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      }
    })

    if (res.status === 404 ) {
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
}

export const downloadFileFromDriveService = async ({fileId, accessToken, token}) => {
  try {
    const url = driveRouteGroup.downloadFileFromDrive({fileId, accessToken});
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      }
    })

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
}

export const updateFileNameByFileIdService = async ({fileId, accessToken, newName, token}) => {
  try {
    const url = driveRouteGroup.updateFileNameByFileId({fileId, accessToken, newName});
    const res = fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      }
    })

    if (!res.ok){
      const errorData = await res.json().catch(() => null);
      throw new Error(
        `Failed to update file name: ${res.status} ${
          errorData?.message || ""
        }`
      );
    }

    return (await res).json();
  } catch (error) {
    console.error("Error in updateFileNameByFileIdSevice:", error);
    throw error;
  }
}