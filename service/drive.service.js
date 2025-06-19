import { driveRouteGroup } from "@/routes/driveRoute";


export const deleteFileByFileIdService = async ({ accessToken, fileId, token }) => {
  try {
    const url = driveRouteGroup.deleteFileByFileId(fileId, accessToken);
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