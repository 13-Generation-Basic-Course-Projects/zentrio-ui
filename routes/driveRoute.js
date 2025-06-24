import { apiConfig } from "@/constant/baseurl";

export const driveRouteGroup = {
  deleteFileByFileId: ({fileId, accessToken}) => 
    `${apiConfig.baseUrl}/files/file?accessToken=${accessToken}&fileId=${fileId}`,
  downloadFileFromDrive: ({fileId, accessToken}) =>
    `${apiConfig.baseUrl}/files/${fileId}/download?accessToken=${accessToken}`,
  updateFileNameByFileId: ({ accessToken, fileId, newName }) =>
  `${apiConfig.baseUrl}/files/rename?accessToken=${accessToken}&fileId=${fileId}&newName=${encodeURIComponent(newName)}`
};