import { apiConfig } from "@/constant/baseurl";

export const driveRouteGroup = {
  deleteFileByFileId: ({fileId, accessToken}) => 
    `${apiConfig.baseUrl}/files/file?accessToken=${accessToken}&fileId=${fileId}`,
  downloadFileFromDrive: ({fileId, accessToken}) =>
    `${apiConfig.baseUrl}/files/${fileId}/download?accessToken=${accessToken}`,
  updateFileNameByFileId: ({ accessToken, fileId, newName }) =>
  `${apiConfig.baseUrl}/files/rename?accessToken=${accessToken}&fileId=${fileId}&newName=${encodeURIComponent(newName)}`,
  getDriveFileById: ({ accessToken, fileId }) =>
  `${apiConfig.baseUrl}/files/file?accessToken=${accessToken}&fileId=${fileId}`,
  uploadDocumentToFolder: (folderId, token) =>
  `${apiConfig.baseUrl}/files/upload-image-to-drive?token=${token}&folderId=${folderId}`,
};